class Bot < ApplicationRecord
  include BetterJson
  has_many :bot_histories
  has_many :game_result_bots, dependent: :nullify
  has_many :game_results, through: :game_result_bots
  has_many :won_games, class_name: "GameResult", foreign_key: "winner_id"
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true
  validates :name, :author, :race, presence: true
  after_create :create_history
  before_save :set_file_path
  after_save :save_dll
  before_destroy :destroy_history, :destroy_bot_executable

  attr_writer :file

  def set_file_path
    self.executable = "#{bot_url}"
  end

  def save_dll
    puts "Attempt to upload bot"
    return unless @file.present?
    File.open("#{bot_filepath}", 'wb') { |file| file.write(@file.read) }
    puts "Bot upload complete"
  end

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

  def bot_url
    return "#{bot_url}#{bot_filename}"
  end

  def bot_filepath
    return "#{bot_directory}#{bot_filename}"
  end

  private
  def destroy_history
    BotHistory.where(bot_id: self.id).destroy_all
  end

  def destroy_bot_executable
    File.delete("#{bot_filepath}")
  end

  def bot_directory
    return "public/user-upload/dll/"
  end

  # Things are uploaded to the public folder, but public is not part of the url.
  def bot_url
    return "user-upload/dll/"
  end

  def bot_file_extension
    return File.extname @file.path
  end

  def bot_filename
    return "#{name.gsub(/[^0-9A-z.\-]/, '_')}#{id}#{bot_file_extension}"
  end

  def vs_race(race, id)
    GameResult.joins(:bots).where(bots: {race: race}).where.not(bots: {id: id})
  end
end
