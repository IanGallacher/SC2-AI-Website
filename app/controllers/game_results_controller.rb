class GameResultsController < ApplicationController
  def index
    authorize! :read, GameResult
    game_results = GameResult.includes(:bots, :winner)

    # Paginate the game results
    if params.has_key?(:page)
      # page is set
      if params.has_key?(:per_page)
        # per_page is set
        game_results = game_results.paginate(
                          page: params[:page],
                          per_page: params[:per_page]
                        )
      else
        # per_page not set - default to 100
        game_results = game_results.paginate(page: params[:page], per_page: 100)
      end

      render json: {
        game_results: game_results.as_json(template: :index),
        total: game_results.total_entries
      }
      return
    else
      # page not set - return all results
      render json: {
        game_results: game_results.as_json(template: :index),
        total: game_results.length
      }
      return
    end
  end

  def create
    authorize! :create, GameResult
    if GameResult.create(game_result_params)
      render json: { status: :ok }
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
