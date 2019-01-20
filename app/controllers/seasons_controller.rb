class SeasonsController < ApplicationController
  def index
    render json: Season.all
  end

  def show
    render json: statistics
  end

  def create
    authorize! :create, Season
    season = Season.create(season_params)
    if season.errors.any?
      render json: season.errors, status: :unprocessable_entity
    else
      render json: { status: :ok }
    end
  end

  private

  def season_params
    p = params.permit(:name, :start_date, :end_date)
  end

  def statistics
    statistics = Season.find(params[:id]).bot_season_statistics.includes(bot: [:owner, :mmr_histories])
    statistics.as_json(template: :show).map do |statistic|
      {
        id: statistic['id'],
        bot_id: statistic[:bot]['id'],
        match_count: statistic['match_count'],
        win_count: statistic['win_count'],
        name: statistic[:bot]['name'],
        race: statistic[:bot]['race'],
        author: statistic[:bot][:owner]['username'],
        author_id: statistic[:bot]['owner_id'],
        patreon_tier: statistic[:bot][:owner]['patreon_tier'],
        mmr: statistic['mmr']
      }
    end
  end
end
