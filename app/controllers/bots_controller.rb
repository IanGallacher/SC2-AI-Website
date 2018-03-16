class BotsController < ApplicationController
  protect_from_forgery except: :destroy
  def index
    render json: Bot.all
  end
  def create
    Bot.all
  end
  def show
    render json: Bot.find(params[:id])
  end
#  def destroy
#    render json: Bot.destroy(params[:id])
#  end
end
