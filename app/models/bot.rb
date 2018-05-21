class Bot < ApplicationRecord
  include BetterJson
  has_many :bot_histories
  has_many :game_result_bots 
  has_many :game_results, through: :game_result_bots
  has_many :won_games, class_name: "GameResult", foreign_key: "winner_id"
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true
  validates :name, :author, :race, presence: true
  after_create :create_history

  attr_writer :file

  def create_history
    BotHistory.create(bot_id: self.id, mmr: 1600)
  end

  def current_mmr
    return BotHistory.where(bot_id: self.id).last.mmr
  end

  private
  def get_filename
    return "public/user-upload/dll/#{name.gsub(/[^0-9A-z.\-]/, '_')}.dll"
  end
end
