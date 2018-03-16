class GameResultsController < ApplicationController
  def index
    authorize! :read, GameResult
    game_results = GameResult.includes( :bots )
    #game_results = GameResult.eager_load( :bots )
    render json: game_results.as_json(template: :index) 
  end
end
