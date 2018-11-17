# == Schema Information
#
# Table name: bot_season_statistics
#
#  id          :bigint(8)        not null, primary key
#  match_count :integer          default(0), not null
#  win_count   :integer          default(0), not null
#  bot_id      :bigint(8)        not null
#  season_id   :bigint(8)        not null
#
# Indexes
#
#  index_bot_season_statistics_on_bot_id     (bot_id)
#  index_bot_season_statistics_on_season_id  (season_id)
#

class BotSeasonStatistic < ApplicationRecord
  include BetterJson
  belongs_to :bot
  belongs_to :season

  def mmr
    bot.current_mmr(season)
  end

  def matches
    bot.game_results.where(season_id: season_id)
  end

  def victories
    matches.where(winner_id: bot_id)
  end

  def match_count
    matches.count
  end

  def win_count
    victories.count
  end
end
