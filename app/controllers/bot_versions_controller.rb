class BotVersionsController < ApplicationController
  def show
    bot_versions = BotVersion.where(bot_id: params[:id])
    bot_versions.season_id = params[:season_id] if params[:season_id]
    render json: bot_versions
  end
end
