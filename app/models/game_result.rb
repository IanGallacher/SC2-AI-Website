# == Schema Information
#
# Table name: game_results
#
#  id         :bigint(8)        not null, primary key
#  map        :string(255)      not null
#  replay     :string(255)
#  status     :string(255)      not null
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

  STATUS = %w[draw crash timeout in_progress complete pending]

  STATUS_MAP = {
    'Timeout' => 'timeout',
    'Tie' => 'draw',
    'Player1Crash' => 'crash',
    'Player2Crash' => 'crash',
    'Player1Win' => 'complete',
    'Player2Win' => 'complete'
  }

  has_and_belongs_to_many :bots
  accepts_nested_attributes_for :bots
  belongs_to :season
  belongs_to :winner, class_name: 'Bot', foreign_key: :winner_id, optional: true
  has_many :mmr_histories

  attr_writer :replayfile
  attr_writer :bot_ids
  attr_writer :mmr_changes
  attr_writer :result # Compatibility layer for old api
  attr_writer :without_history # Needed for automated tests.

  before_validation :set_season_if_necessary
  before_validation :set_result_status
  before_save :add_bots_from_ids
  after_save :save_replay, :update_mmr, :associate_bots_with_season

  validates :map, presence: true
  validates :status, inclusion: { in: GameResult::STATUS }, presence: true

  def winner_name
    winner&.name
  end

  def replay_url
    file_path + filename
  end

  private

  def add_bots_from_ids
    return unless @bot_ids.present?
    @bot_ids.each do |bot_id|
      self.bots.push Bot.find(bot_id)
    end
  end

  def set_season_if_necessary
    self.season = Season.current_season if self.season.blank?
  end

  def set_result_status
    self.status ||= 'in_progress'
    self.status = 'complete' if self.winner_id.present?
    self.status = 'complete' if self.status.blank?
    self.status = STATUS_MAP[@result] if @result.present?
  end

  def save_replay
    return unless @replayfile.present?
    return if self.replay == replay_url
    self.update_attributes(replay: replay_url)
    UploadedFile.new(@replayfile).write_to_public(filename)
  end

  def update_mmr
    bot_1 = self.bots.first
    bot_2 = self.bots.second
    # Keep track of the current mmr before changing the database
    bot_1_mmr = bot_1.current_mmr(self.season)
    bot_2_mmr = bot_2.current_mmr(self.season)
    score = (self.winner_id == bot_1.id) ? 1 : 0
    return if @without_history == true
    logger.warn("You are saving game_result #{self.id} without automatically calcualting MMR")
    add_history(bot_1.id, bot_2_mmr, score, @mmr_changes&.send(:[], 0))
    add_history(bot_2.id, bot_1_mmr, 1-score, @mmr_changes&.send(:[], 1))
  end

  def associate_bots_with_season
    bots.each do |bot|
      BotSeasonStatistic.find_or_create_by(bot: bot, season: season)
    end
  end

  def add_history(bot_id, enemy_mmr, score, change_mmr_by)
    MmrHistory.create!(
      bot_id: bot_id,
      game_result_id: self.id,
      competitor_mmr: enemy_mmr,
      created_at: self.created_at,
      score: score,
      season: season,
      change_mmr_by: change_mmr_by
    )
  end

  def file_path
    '/replays/'
  end

  def filename
    extname = File.extname(@replayfile.original_filename)
    basename = File.basename(@replayfile.original_filename, extname)
    "#{basename.gsub(/[^0-9A-z.\-]/, '_')}_ResultID#{id}.Sc2Replay"
  end
end
