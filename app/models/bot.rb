class Bot < ApplicationRecord
  has_many :game_result_bots 
  has_many :bot_histories
  has_many :game_results, through: :game_result_bots
  has_many :won_games, class_name: "GameResult", foreign_key: "winner_id"
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true

  attr_writer :file
  before_save :save_dll

  def save_dll
    puts "CHECKING DLL"
    return unless @file.present?
    File.open(get_filename(), 'wb') { |file| file.write(@file.read) }
  end

  private
  def get_filename
    "public/user-upload/dll/#{name.gsub(/[^0-9A-z.\-]/, '_')}.dll"
  end
end
