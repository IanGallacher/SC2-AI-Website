# == Schema Information
#
# Table name: game_result_bots
#
#  id             :bigint(8)        not null, primary key
#  bot_id         :bigint(8)        not null
#  game_result_id :bigint(8)        not null
#
# Indexes
#
#  fk_rails_1e2878cb84  (bot_id)
#  fk_rails_2975451098  (game_result_id)
#
# Foreign Keys
#
#  fk_rails_...  (bot_id => bots.id)
#  fk_rails_...  (game_result_id => game_results.id)
#

class GameResultBot < ApplicationRecord
  belongs_to :bot, counter_cache: :match_count
  belongs_to :game_result
end
