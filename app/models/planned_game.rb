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
  VALID_PLANNING_METHODS = ::PlannedGameFactory.instance_methods.map(&:to_s)
  PLAN_VALID_TIME = 3.hours
  MAX_MATCH_LENGTH = 1.hour

  belongs_to :season
  has_and_belongs_to_many :bots

  scope :reserved_games, -> { where.not(computer_id: nil) }
  scope :unreserved_games, -> { where(computer_id: nil) }

  def self.generate_game(season, computer_id:, planning_method:)
    validate_planning_method(planning_method)
    planning_method ||= season.planning_method
    PlannedGameFactory.send(planning_method, computer_id: computer_id)
  end

  def self.find_game(season, computer_id)
    game = PlannedGame.where(season: season, computer_id: computer_id).first
    game ||= unreserved_games.find_by(season: season)
    return game unless game.expired?
  end

  def self.reserve_game(season, computer_id)
    next_game = find_or_generate(season, computer_id)
    next_game.update_attributes(computer_id: computer_id)
    return next_game
  end

  def self.find_or_generate(season, computer_id)
    find_game(season, computer_id) || generate_game(season, computer_id)
  end

  def self.find_or_reserve(season, computer_id)
    find_by_computer_id(computer_id) || reserve_game(season, computer_id)
  end

  def expired?
    Time.now.utc + MAX_MATCH_LENGTH > created_at + PLAN_VALID_TIME
  end

  private

  def self.validate_planning_method
    return if planning_method.in? VALID_PLANNING_METHODS
    raise ArgumentError.new(
      %{Planning method "#{planning_method}" is not in PlannedGameFactory}
    )
  end
end
