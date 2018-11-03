class BotsController < ApplicationController
  def index
    respond_to do |format|
      format.json { render json: Bot.all }
      format.zip { redirect_to Season.find(params[:season_id]).download_bots_url }
    end
  end

  def show
    bot = Bot.find(params[:id])
    bot.season_id = params[:season_id] if params[:season_id]

    respond_to do |format|
      format.json { render json: bot }
      format.zip { redirect_to Bot.find(params[:bot_id]).download_url }
    end
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
    p = params.permit(:name, :author, :race, :file)
    p[:owner_id] = current_user.id if current_user.present?
    p[:author] ||= current_user.username if current_user.present?
    return p
  end
end
