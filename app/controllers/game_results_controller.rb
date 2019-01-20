class GameResultsController < IncludedLoginCredentialsController
  def index
    authorize! :read, GameResult
    game_results = GameResult.includes(:bots, :winner)

    if params.has_key?(:season_id)
      game_results = game_results.where(season: params[:season_id])
    end

    # Paginate the game results
    if params.has_key?(:page)
      game_results = game_results.paginate(
        page: params[:page],
        per_page: params[:per_page] || 100
      )
      total = game_results.total_entries
    else
      total = game_results.length
    end
    render json: {
      game_results: game_results.as_json(template: :index),
      total: total
    }
  end

  def create
    authorize! :create, GameResult
    if GameResult.create(game_result_params)
      render json: { status: :ok }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  # Parse the input of the ladder manager.
  def game_result_params
    p = params.permit(:map, :replayfile, :winner_id, :gba)
    if params.key? :gba
      p[:bot_ids] = JSON.parse(params[:gba])
    else
      bot_ids = []
      bot_ids.push Bot.where(name: params[:Bot1Name]).first.id
      bot_ids.push Bot.where(name: params[:Bot2Name]).first.id
      p[:bot_ids] = bot_ids
      p[:map] = params[:Map]
      if params[:Result] == 'Player1Win'
        p[:winner_id] = Bot.where(name: params[:Bot1Name]).first.id
      end
      if params[:Result] == 'Player2Win'
        p[:winner_id] = Bot.where(name: params[:Bot2Name]).first.id
      end
    end
    if p[:winner_name].present?
      p[:winner_id] = Bot.where(name: params[:winner_name]).first.id
    end
    return p
  end
end
