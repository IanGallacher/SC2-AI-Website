class GameResultsController < ApplicationController
  def index
    authorize! :read, GameResult
    game_results = GameResult.includes( :bots, :winner )
    #game_results = GameResult.eager_load( :bots )
    render json: game_results.as_json(template: :index) 
  end

  def create
    if GameResult.create(game_result_params)
      render json: {status: :ok}
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def game_result_params
    p = params.permit(:map, :file, :winner_id)
    p[:game_result_bots_attributes] = JSON.parse(params[:gba])
    p[:winner_id] ||= Bot.where(name: params[:winner_name]).first.id
    #p[:owner_id] = current_user.id
    #p[:author] ||= current_user.username
    return p
  end
end
