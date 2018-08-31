class CreateBotVersion < ActiveRecord::Migration[5.1]
  def change
    create_table :bot_versions do |t|
      t.references :bot, null: false, index: true
      t.references :season, null: false, index: true
      t.integer :version, null: false
      t.string :executable, null: false
      t.boolean :visable, null: false, default: true
      t.timestamps null: false
    end
  end
end
