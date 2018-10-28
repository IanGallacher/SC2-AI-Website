class BotHistoriesController < ApplicationController
  def index
    render json: BotHistory.all
  end

  def show
    histories = BotHistory.where(bot_id: params[:id])
    season_id = params[:season_id]
    histories = histories.where(season_id: season_id) if season_id.present?
    render json: histories
  end
end
