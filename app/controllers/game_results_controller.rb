class GameResultsController < ApplicationController
  def index
    authorize! :read, GameResult
    game_results = GameResult.includes(:bots, :winner)
    #game_results = GameResult.eager_load( :bots )
    if params.has_key?(:page) && params.has_key?(:per_page)
      render json: game_results.all.paginate(page: params[:page], per_page: params[:per_page]).as_json(template: :index)
    elsif params.has_key?(:page)
      render json: game_results.all.paginate(page: params[:page], per_page: 10).as_json(template: :index)
    else
      render json: game_results.as_json(template: :index)
    end
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
      p[:game_result_bots_attributes] = JSON.parse(params[:gba])
    else
      attributes = []
      attributes.push bot_id: Bot.where(name: params[:Bot1Name]).first.id
      attributes.push bot_id: Bot.where(name: params[:Bot2Name]).first.id
      p[:game_result_bots_attributes] = attributes
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
