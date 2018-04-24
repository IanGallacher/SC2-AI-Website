class CreateGameResults < ActiveRecord::Migration[5.1]
  def change
    create_table :game_results do |t|
      t.string :map, null: false
      t.integer :winner_id, limit: 8
    end
    add_foreign_key :game_results, :bots, column: :winner_id

# For one game result, there are multiple bots who participate.
    create_table :game_result_bots do |t|
      t.integer :bot_id, null: false, limit: 8
      t.integer :game_result_id, null: false, limit: 8
    end
    add_foreign_key :game_result_bots, :bots
    add_foreign_key :game_result_bots, :game_results
  end
end
