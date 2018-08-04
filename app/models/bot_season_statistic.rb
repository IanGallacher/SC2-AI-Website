# == Schema Information
#
# Table name: bot_season_statistics
#
#  id        :bigint(8)        not null, primary key
#  bot_id    :bigint(8)        not null
#  season_id :bigint(8)        not null
#
# Indexes
#
#  index_bot_season_statistics_on_bot_id     (bot_id)
#  index_bot_season_statistics_on_season_id  (season_id)
#

class BotSeasonStatistic < ApplicationRecord
  belongs_to :bot
  belongs_to :season

  def match_count
    return bot.game_results.where(season: season).count
  end

  def win_count
    return bot.game_results.where(season: season, winner_id: bot.id).count
  end
end
