class GameResult < ApplicationRecord
  include BetterJson
  has_many :game_result_bots
  accepts_nested_attributes_for :game_result_bots
  has_many :bots, through: "game_result_bots"
  belongs_to :winner, class_name: "Bot", foreign_key: "winner_id", optional: true, counter_cache: :win_count

  attr_writer :replayfile
  before_save :save_replay
  after_save :update_mmr

  def save_replay
    puts "CHECKING REPLAY"
    return unless @replayfile.present?
    self.replay = get_filename()
    File.open("public" + get_filename(), 'wb') { |replayfile| replayfile.write(@replayfile.read) }
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
    if (self.winner_id == bot_1_id)
      score = 1
    end
    BotHistory.create(bot_id: bot_1_id, competitor_mmr: bot_2_mmr, score: score)
    BotHistory.create(bot_id: bot_2_id, competitor_mmr: bot_1_mmr, score: 1-score)
  end

  private
  def get_filename
    extname = File.extname(@replayfile.original_filename)
    basename = File.basename(@replayfile.original_filename, extname)
    "/replay/#{basename.gsub(/[^0-9A-z.\-]/, '_')}.Sc2Replay"
  end
end
