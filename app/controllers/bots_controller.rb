class BotsController < ApplicationController
#  protect_from_forgery only: :destroy
  def index
    render json: Bot.all
  end

  def show
    render json: Bot.find(params[:id])
  end

  def create
    authorize! :create, Bot
    bot = Bot.create(bot_params)
    if bot.errors.any?
      render json: bot.errors, status: :unprocessable_entity
    else
      render json: {status: :ok}
    end
  end

  def upload
    @bot = Bot.find(params[:id])
    authorize! :update, @bot
    if @bot.update dll: params[:dll]
      render json: { status: :ok }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def update
    @bot = Bot.find(params[:id])
    authorize! :update, @bot
    puts 'authorized'
    if @bot.update(bot_params)
      render json: { status: :ok }
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @bot = Bot.find(params[:id])
    authorize! :destroy, @bot
    puts 'authorized'
    @bot.destroy
  end

  private

  def bot_params
    p = params.permit(:name, :author, :race, :file)
    p[:owner_id] = current_user.id
    p[:author] ||= current_user.username
    return p
  end
end
