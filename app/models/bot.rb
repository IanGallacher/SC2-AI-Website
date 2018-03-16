class Bot < ActiveRecord::Base
  has_many :game_result_bots 
  has_many :won_games, class_name: "GameResult", foreign_key: "winner_id"
end
