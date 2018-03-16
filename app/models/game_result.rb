class GameResult < ActiveRecord::Base
  include BetterJson

  has_many :game_result_bots  
  has_many :bots, through: "game_result_bots"
  belongs_to :winner, class_name: "Bot", foreign_key: "winner_id", optional: true, counter_cache: :win_count
end

