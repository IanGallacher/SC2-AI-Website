class AddStatusToGameResult < ActiveRecord::Migration[5.1]
  def change
    add_column :game_results, :status, :string, after: :winner_id, null: false
  end
end
