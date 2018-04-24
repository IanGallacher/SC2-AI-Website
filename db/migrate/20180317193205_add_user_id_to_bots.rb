class AddUserIdToBots < ActiveRecord::Migration[5.1]
  def change
    add_column :bots, :owner_id, :integer, limit: 8, after: :id
    add_foreign_key :bots, :users, column: :owner_id
  end
end
