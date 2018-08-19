class RemoveDllColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :bots, :dll
  end
end
