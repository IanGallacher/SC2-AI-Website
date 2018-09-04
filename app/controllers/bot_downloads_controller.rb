class BotDownloadsController < ApplicationController
  def index
    season = Season.find(params[:season_id])
    season.update_download_zip_if_necessary
    redirect_to season.download_bots_url
  end

  def show
    redirect_to Bot.find(params[:bot_id]).bot_url
  end
end
