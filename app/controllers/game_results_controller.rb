class GameResultsController < ApplicationController
  def index
    authorize! :read, GameResult
    game_results = GameResult.includes(:bots, :winner)
    #game_results = GameResult.eager_load( :bots )

    # Page the game results
    if params.has_key?(:page)
      # page is set
      if params.has_key?(:per_page)
        # per_page is set
        game_results = game_results.paginate(page: params[:page], per_page: params[:per_page])
      else
        # per_page not set - default to 100
        game_results = game_results.paginate(page: params[:page], per_page: 100)
      end

      response = {game_results: game_results.as_json(template: :index), total: game_results.total_entries}
    else
      # page not set - return all results
      response = {game_results: game_results.as_json(template: :index), total: game_results.length}
    end

    render json: response
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
