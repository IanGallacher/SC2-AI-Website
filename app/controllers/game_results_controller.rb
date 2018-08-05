class GameResultsController < ApplicationController
  def index
    authorize! :read, GameResult
    game_results = GameResult.includes(:bots, :winner)
    #game_results = GameResult.eager_load( :bots )
    render json: game_results.as_json(template: :index)
  end

  def create
    authorize! :create, GameResult
    if GameResult.create(game_result_params)
      render json: {status: :ok}
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def game_result_params
    p = params.permit(:map, :replayfile, :winner_id)
    if params.key? :gba
      p[:bot_game_results_attributes] = JSON.parse(params[:gba])
    else
      bot_ids = []
      bot_ids.push bot_id: Bot.where(name: params[:Bot1Name]).first.id
      bot_ids.push bot_id: Bot.where(name: params[:Bot2Name]).first.id
      p[:bot_ids] = bot_ids
      p[:map] = params[:Map]
      if params[:Result] == "Player1Win"
        p[:winner_id] = Bot.where(name: params[:Bot1Name]).first.id
      end
      if params[:Result] == "Player2Win"
        p[:winner_id] = Bot.where(name: params[:Bot2Name]).first.id
      end
    end
    if p[:winner_name].present?
      p[:winner_id] = Bot.where(name: params[:winner_name]).first.id
    end
    return p
  end
end
