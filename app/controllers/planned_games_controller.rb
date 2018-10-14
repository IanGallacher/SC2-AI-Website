class PlannedGamesController < ApplicationController
  def create
    authorize! :create, PlannedGame
    method = params[:method] || :one_match_with_all
    season = Season.find(params[:season_id]) || Season.current_season

    PlannedGame.bulk_create(method, season)

    if planned_game.errors.any?
      render json: planned_game.errors, status: :unprocessable_entity
    else
      render json: planned_game
    end
  end
end
