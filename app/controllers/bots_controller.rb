class BotsController < ApplicationController
  protect_from_forgery only: :destroy
  before_action :set_bot, only: :upload

  def index
    render json: Bot.all
  end

  def show
    render json: Bot.find(params[:id])
  end

  def create
#    authorize! :create, Bot
    if Bot.create(bot_params)
      render json: {status: :ok}
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def upload
    authorize! :update, @bot
    if @bot.update dll: params[:dll]
      render json: {status: :ok}
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

#  def destroy
#    render json: Bot.destroy(params[:id])
#  end

  private
  def set_bot
    @bot = Bot.find(params[:id]);
  end

  def bot_params
    p = params.permit(:name, :author, :race, :file)
    p[:owner_id] = current_user.id
    p[:author] ||= current_user.username
    return p
  end
end
