class BotHistoriesController < ApplicationController
  def index
    render json: BotHistory.all
  end
  def show
    render json: BotHistory.find(params[:id])
  end
end
