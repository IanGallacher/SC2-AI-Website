# == Schema Information
#
# Table name: bots
#
#  id           :bigint(8)        not null, primary key
#  author       :string(255)      not null
#  description  :text(65535)
#  downloadable :boolean          default(FALSE), not null
#  enabled      :boolean          default(FALSE), not null
#  github       :string(255)
#  license      :string(255)
#  match_count  :integer          default(0), not null
#  name         :string(255)      not null
#  race         :string(255)      not null
#  summary      :text(65535)
#  win_count    :integer          default(0), not null
#  owner_id     :bigint(8)
#
# Indexes
#
#  fk_rails_f93a12e463  (owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (owner_id => users.id)
#

class Bot < ApplicationRecord
  include BetterJson
  has_many :mmr_histories
  has_many :bot_season_statistics
  has_many :bot_versions, dependent: :destroy
  has_many :seasons, through: :bot_season_statistics
  has_many :won_games, class_name: "GameResult", foreign_key: "winner_id"
  has_and_belongs_to_many :game_results
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true

  validates :name, :author, :race, presence: true
  validates :name, uniqueness: { case_sensitive: false }

  after_save :save_dll
  before_destroy :destroy_history

  delegate :executable, to: :latest_version
  delegate :download_url, to: :latest_version
  delegate :download_filepath, to: :latest_version

  attr_writer :file
  attr_writer :season_id

  def latest_version(season=Season.current_season)
    self.bot_versions.where(season: season).last
  end

  def save_dll
    return unless @file.present?
    BotVersion.create!(bot_id: self.id, file: @file)
    File.open("#{download_filepath}", 'wb') { |file| file.write(@file.read) }
  end

  def current_mmr(season=Season::current_season)
    return MmrHistory.most_recent_result(self.id, season).mmr
  end

  def win_rate_race
    my_matches = GameResult.joins(:bots).where(bots: { id: self.id })
    my_matches = my_matches.where(season_id: @season_id) if @season_id.present?
    my_matches = my_matches.to_a
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

  def destroy_history
    MmrHistory.where(bot_id: self.id).destroy_all
  end

  def vs_race(race, id)
    GameResult.joins(:bots).where(bots: {race: race}).where.not(bots: {id: id})
  end
end
