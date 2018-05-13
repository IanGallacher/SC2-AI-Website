class BotHistoriesController < ApplicationController
  def index
    render json: BotHistory.all
  end
  def show
    render json: BotHistory.where(bot_id: params[:id])
  end
end
