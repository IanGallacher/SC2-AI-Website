class AddReplayPath < ActiveRecord::Migration[5.1]
  def change
    add_column :game_results, :replay, :string
  end
end
