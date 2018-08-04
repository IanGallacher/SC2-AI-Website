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
  belongs_to :winner, class_name: 'Bot', foreign_key: 'winner_id', optional: true

  validates :map, presence: true

  attr_writer :replayfile
  attr_writer :bot_ids
  before_save :add_bots_from_ids
  after_save :save_replay, :update_mmr

  # before_save
  def add_bots_from_ids
    @bot_ids.each do |bot_id|
      self.bots.push Bot.find(bot_id)
    end
  end

  # after_save
  def save_replay
    return unless @replayfile.present?
    self.replay = replay_url
    File.open('public' + file_path + filename, 'wb') do |replayfile|
      replayfile.write(@replayfile.read)
    end
  end

  # after_save
  def update_mmr
    bot_1_id = self.bots.first.id
    bot_2_id = self.bots.second.id
    # Keep track of the current mmr before changing the database
    bot_1_mmr = BotHistory.where(bot_id: bot_1_id).last.mmr
    bot_2_mmr = BotHistory.where(bot_id: bot_2_id).last.mmr
    score = (self.winner_id == bot_1_id) ? 1 : 0
    add_history(bot_1_id, bot_2_mmr, score)
    add_history(bot_2_id, bot_1_mmr, 1-score)
  end

  def winner_name
    return if winner.nil?
    winner.name
  end

  def replay_url
    file_path + filename
  end

  private

  def add_history(bot_id, enemy_mmr, score)
    BotHistory.create!(
      bot_id: bot_id,
      competitor_mmr: enemy_mmr,
      created_at: self.created_at,
      score: score,
      season: season
    )
  end

  def file_path
    '/replay/'
  end

  def filename
    extname = File.extname(@replayfile.original_filename)
    basename = File.basename(@replayfile.original_filename, extname)
    "#{basename.gsub(/[^0-9A-z.\-]/, '_')}_ResultID#{id}.Sc2Replay"
  end
end
