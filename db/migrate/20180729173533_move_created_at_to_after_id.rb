class MoveCreatedAtToAfterId < ActiveRecord::Migration[5.1]
  def up
    change_column :game_results, :created_at, :datetime, after: :id
  end
  def down
    change_column :game_results, :created_at, :datetime, after: :replay
  end
end
