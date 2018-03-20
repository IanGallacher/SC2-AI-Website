class Bot < ActiveRecord::Base
  has_many :game_result_bots 
  has_many :won_games, class_name: "GameResult", foreign_key: "winner_id"
  belongs_to :owner, class_name: "User", foreign_key: "owner_id", optional: true
end
