# == Schema Information
#
# Table name: game_results
#
#  id         :bigint(8)        not null, primary key
#  map        :string(255)      not null
#  replay     :string(255)
#  created_at :datetime
#  season_id  :bigint(8)        not null
#  winner_id  :bigint(8)
#
# Indexes
#
#  fk_rails_f187e71c0b              (winner_id)
#  index_game_results_on_season_id  (season_id)
#
# Foreign Keys
#
#  fk_rails_...  (winner_id => bots.id)
#

class GameResult < ApplicationRecord
  include BetterJson
  has_and_belongs_to_many :bots
  accepts_nested_attributes_for :bots
  belongs_to :season
  belongs_to :winner, class_name: 'Bot', foreign_key: :winner_id, optional: true

  validates :map, presence: true

  attr_writer :replayfile
  attr_writer :bot_ids
  before_save :add_bots_from_ids
  after_create :increment_match_counters
  after_destroy :decrement_match_counters
  after_save :save_replay, :update_mmr

  def winner_name
    winner&.name
  end

  def replay_url
    file_path + filename
  end

  private

  # private before_save
  def add_bots_from_ids
    return unless @bot_ids.present?
    @bot_ids.each do |bot_id|
      self.bots.push Bot.find(bot_id)
    end
  end

  # before_create
  def increment_match_counters
    increment_bot_counter(self.bots[0], self.season, :match_count)
    increment_bot_counter(self.bots[1], self.season, :match_count)
    increment_bot_counter(self.winner, self.season, :win_count)
  end

  # private
  def increment_bot_counter(bot, season, counter_name)
    BotSeasonStatistic.find_or_create_by(bot: bot, season: season)
                      .increment(counter_name)
                      .save
    bot.increment(counter_name).save
  end

  # private before_destory
  def decrement_match_counters
    decrement_bot_counter(self.bots[0], self.season, :match_count)
    decrement_bot_counter(self.bots[1], self.season, :match_count)
    decrement_bot_counter(self.winner, self.season, :win_count)
  end

  # private
  def decrement_bot_counter(bot, season, counter_name)
    BotSeasonStatistic.find_or_create_by(bot: bot, season: season)
                      .decrement(counter_name)
                      .save
    bot.decrement(counter_name).save
  end

  # private after_save
  def save_replay
    return unless @replayfile.present?
    self.replay = replay_url
    File.open('public' + file_path + filename, 'wb') do |replayfile|
      replayfile.write(@replayfile.read)
    end
  end

  # private after_save
  def update_mmr
    bot_1 = self.bots.first
    bot_2 = self.bots.second
    # Keep track of the current mmr before changing the database
    bot_1_mmr = bot_1.current_mmr(self.season)
    bot_2_mmr = bot_2.current_mmr(self.season)
    score = (self.winner_id == bot_1.id) ? 1 : 0
    add_history(bot_1.id, bot_2_mmr, score)
    add_history(bot_2.id, bot_1_mmr, 1-score)
  end

  # private
  def add_history(bot_id, enemy_mmr, score)
    BotHistory.create!(
      bot_id: bot_id,
      competitor_mmr: enemy_mmr,
      created_at: self.created_at,
      score: score,
      season: season
    )
  end

  # private
  def file_path
    '/replay/'
  end

  # private
  def filename
    extname = File.extname(@replayfile.original_filename)
    basename = File.basename(@replayfile.original_filename, extname)
    "#{basename.gsub(/[^0-9A-z.\-]/, '_')}_ResultID#{id}.Sc2Replay"
  end
end
