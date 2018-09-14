class RemoveBotExecutable < ActiveRecord::Migration[5.1]
  def up
    remove_column :bots, :executable
  end

  def down
    add_column :bots, :executable, :string
  end
end
