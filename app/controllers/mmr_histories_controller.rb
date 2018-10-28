class MmrHistoriesController < ApplicationController
  def index
    render json: MmrHistory.where(mmr_history_params)
  end

  def show
    render json: MmrHistory.find(params[:id])
  end

  private

  def mmr_history_params
    params.permit(:bot_id, :season_id)
  end
end
