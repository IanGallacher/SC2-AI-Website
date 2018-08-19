class CreateJoinTableGameResultBot < ActiveRecord::Migration[5.1]
  def up
    create_join_table :game_results, :bots do |t|
      t.index :game_result_id
      t.index :bot_id
    end
    drop_table :game_result_bots
  end

  def down
    create_table :game_result_bots do |t|
      t.integer :bot_id, null: false, limit: 8
      t.integer :game_result_id, null: false, limit: 8
    end
    add_foreign_key :game_result_bots, :bots
    add_foreign_key :game_result_bots, :game_results
    drop_table :bot_game_results
  end
end
