class GameResultBot < ApplicationRecord
  belongs_to :bot, counter_cache: :match_count
  belongs_to :game_result
end
