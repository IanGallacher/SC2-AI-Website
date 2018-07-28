class AddCreatedAtToGameResult < ActiveRecord::Migration[5.1]
  def change
    add_column :game_results, :created_at, :datetime
  end
end