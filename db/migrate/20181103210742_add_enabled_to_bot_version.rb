class AddEnabledToBotVersion < ActiveRecord::Migration[5.1]
  def change
    add_column :bot_versions, :enabled, :boolean, after: :executable, default: true, null: false
  end
end
