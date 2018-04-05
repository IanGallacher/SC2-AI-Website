class GameResult < ActiveRecord::Base
  include BetterJson

  has_many :game_result_bots  
  accepts_nested_attributes_for :game_result_bots
  has_many :bots, through: "game_result_bots"
  belongs_to :winner, class_name: "Bot", foreign_key: "winner_id", optional: true, counter_cache: :win_count
  
  attr_writer :file
  before_save :save_replay

  def save_replay
    puts "CHECKING REPLAY"
    return unless @file.present?
    File.open(get_filename(), 'wb') { |file| file.write(@file.read) }
  end

  def winner_name
    return if winner.nil?
    winner.name
  end

  private
  def get_filename
    extname = File.extname(@file.original_filename)
    basename = File.basename(@file.original_filename, extname)
    "public/replay/#{basename.gsub(/[^0-9A-z.\-]/, '_')}.Sc2Replay"
  end
end

