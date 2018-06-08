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

  def win_rate_race
    my_matches = GameResult.joins(:bots).where(:bots => {id: self.id}).to_a
    victory = GameResult.where(winner_id: self.id).to_a
    vs_terran = my_matches & vs_race("Terran", self.id).to_a
    vs_protoss = my_matches & vs_race("Protoss", self.id).to_a
    vs_zerg = my_matches & vs_race("Zerg", self.id).to_a

    return_array = {}
    return_array[:terran] = { win_count: (vs_terran & victory).size, match_count: vs_terran.size }
    return_array[:protoss] = { win_count: (vs_protoss & victory).size, match_count: vs_protoss.size }
    return_array[:zerg] = { win_count: (vs_zerg & victory).size, match_count: vs_zerg.size }

    return return_array
  end

  private
  def get_filename
    return "public/user-upload/dll/#{name.gsub(/[^0-9A-z.\-]/, '_')}.dll"
  end

  def vs_race(race, id)
    GameResult.joins(:bots).where(bots: {race: race}).where.not(bots: {id: id})
  end
end
