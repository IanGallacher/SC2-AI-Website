class PlannedGamesController < ApplicationController
  def index
    season = Season.find(params[:season_id])
    render json: PlannedGame.where(season: season)
  end

  def show
    render json: PlannedGame.find(params[:id])
  end

  def create
    authorize! :create, PlannedGame

    planned_game = PlannedGame.generate_game(
      Season.find(params[:season_id]) || Season.current_season,
      planning_method: params[:method],
      computer_id: params[:computer_id]
    )

    if planned_game.errors.any?
      render json: planned_game.errors, status: :unprocessable_entity
    else
      render json: planned_game
    end
  end
end
