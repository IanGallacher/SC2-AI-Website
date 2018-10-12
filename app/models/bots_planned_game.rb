# == Schema Information
#
# Table name: bots_planned_games
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  bot_id     :bigint(8)
#  season_id  :bigint(8)
#
# Indexes
#
#  index_bots_planned_games_on_bot_id     (bot_id)
#  index_bots_planned_games_on_season_id  (season_id)
#
# Foreign Keys
#
#  fk_rails_...  (bot_id => bots.id)
#  fk_rails_...  (season_id => seasons.id)
#

class BotsPlannedGame < ApplicationRecord
  belongs_to :bots
  belongs_to :planned_games
end
