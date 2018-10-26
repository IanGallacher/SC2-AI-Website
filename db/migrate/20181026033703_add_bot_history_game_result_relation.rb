class AddBotHistoryGameResultRelation < ActiveRecord::Migration[5.1]
  def change
    add_reference :bot_histories, :game_result, foreign_key: true
  end
end
