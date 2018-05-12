class AddBotHistory < ActiveRecord::Migration[5.1]
  def change
    create_table :bot_histories do |t|
      t.references :bot, null: false, index: true
      t.integer :mmr, null: false
      t.datetime :created_at, null: false
    end
    add_foreign_key :bot_histories, :bots
  end
end
