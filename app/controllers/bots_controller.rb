class BotsController < ApplicationController
  def index
    render json: Bot.all
  end

  def show
    bot = Bot.find(params[:id])
    bot.season_id = params[:season_id] if params[:season_id]
    render json: bot
  end

  def create
    authorize! :create, Bot
    bot = Bot.create(bot_params)
    if bot.errors.any?
      render json: bot.errors, status: :unprocessable_entity
    else
      render json: { status: :ok }
    end
  end

  def update
    @bot = Bot.find(params[:id])
    authorize! :update, @bot
    if @bot.update(bot_params)
      render json: { status: :ok }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @bot = Bot.find(params[:id])
    authorize! :destroy, @bot
    if @bot.destroy
      render json: { status: :ok }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  private

  def bot_params
    p = params.permit(%i[
      name author race file enabled downloadable license summary description github
    ])
    p[:owner_id] = current_user.id if current_user.present?
    p[:author] ||= current_user.username if current_user.present?
    return p
  end
end
