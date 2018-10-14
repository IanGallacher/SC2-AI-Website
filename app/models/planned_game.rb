# == Schema Information
#
# Table name: planned_games
#
#  id           :bigint(8)        not null, primary key
#  requested_on :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  computer_id  :integer
#  season_id    :bigint(8)
#
# Indexes
#
#  index_planned_games_on_season_id  (season_id)
#

class PlannedGame < ApplicationRecord
  belongs_to :season
  has_and_belongs_to_many :bots

  scope :unreserved_games, -> { where(computer_id: nil) }
  scope :next_available_game, -> (season) { unreserved_games.find_by(season: season) }

  def self.bulk_create(method, season)
    matches = one_match_with_all(season.bots) if method == :one_match_with_all
    matches.each do |bot_matchup|
      PlannedGame.create!(bots: bot_matchup, season: Season.current_season)
    end
  end

  def self.reserve_game(season, computer_id)
    next_game = next_available_game(season)
    next_game.update_attributes(computer_id: computer_id)
    return next_game
  end

  def self.find_or_reserve(season, computer_id)
    existing_next_game = PlannedGame.find_by(computer_id: computer_id)
    return existing_next_game if existing_next_game.present?
    reserve_game(season, computer_id)
  end

  private

  def self.one_match_with_all(season_bots)
    matches = []
    season_bots.each_with_index do |bot_a, bot_a_index|
      season_bots.each_with_index do |bot_b, bot_b_index|
        matches.push [bot_a, bot_b] if bot_b_index > bot_a_index
      end
    end
    return matches
  end
end
