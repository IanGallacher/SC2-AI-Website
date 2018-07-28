# == Schema Information
#
# Table name: game_results
#
#  id        :bigint(8)        not null, primary key
#  map       :string(255)      not null
#  replay    :string(255)
#  winner_id :bigint(8)
#
# Indexes
#
#  fk_rails_f187e71c0b  (winner_id)
#
# Foreign Keys
#
#  fk_rails_...  (winner_id => bots.id)
#

class GameResult < ApplicationRecord
  include BetterJson
  has_many :game_result_bots
  accepts_nested_attributes_for :game_result_bots
  has_many :bots, through: 'game_result_bots'
  belongs_to :winner, class_name: 'Bot', foreign_key: 'winner_id', optional: true, counter_cache: :win_count

  attr_writer :replayfile
  after_save :save_replay, :update_mmr

  def save_replay
    return unless @replayfile.present?
    self.replay = replay_url
    File.open('public' + file_path + filename, 'wb') do |replayfile|
      replayfile.write(@replayfile.read)
    end
  end

  def winner_name
    return if winner.nil?
    winner.name
  end

  def update_mmr
    bot_1_id = self.game_result_bots[0].bot_id
    bot_2_id = self.game_result_bots[1].bot_id
    # Keep track of the current mmr before changing the database
    bot_1_mmr = BotHistory.where(bot_id: bot_1_id).last.mmr
    bot_2_mmr = BotHistory.where(bot_id: bot_2_id).last.mmr
    score = 0
    score = 1 if (self.winner_id == bot_1_id)
    BotHistory.create(bot_id: bot_1_id, competitor_mmr: bot_2_mmr, score: score)
    BotHistory.create(bot_id: bot_2_id, competitor_mmr: bot_1_mmr, score: 1-score)
  end

  def replay_url
    file_path + filename
  end

  private

  def file_path
    '/replay/'
  end

  def filename
    extname = File.extname(@replayfile.original_filename)
    basename = File.basename(@replayfile.original_filename, extname)
    "#{basename.gsub(/[^0-9A-z.\-]/, '_')}_ResultID#{id}.Sc2Replay"
  end
end
