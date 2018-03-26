class UsersController < ApplicationController
  protect_from_forgery except: :destroy
  def index
    render json: current_user.as_json
  end
  def show
    render json: User.find(params[:id])
  end

  def create
    authorize! :create, Bot
    if Bot.create(bot_params)
      render json: {status: :ok}
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end

  def upload
    @user = User.find(params[:user_id]);
    puts params
#    authorize! :update, @bot
    if @user.update file: params[:file]
      render json: {status: :ok}
    else
      render json: @bot.errors, status: :unprocessable_entity
    end
  end
end
