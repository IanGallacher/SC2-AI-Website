class NextGamesController < ApplicationController
  def show
    authorize! :update, PlannedGame
    season = params[:season] || Season.current_season
    planned_game = PlannedGame.find_or_reserve(season, params[:computer_id])

    if planned_game.errors.any?
      render json: planned_game.errors, status: :unprocessable_entity
    else
      render json: planned_game
    end
  end
end
