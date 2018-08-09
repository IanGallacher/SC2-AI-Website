class AddBotSeasonRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :bot_season_statistics do |t|
      t.references :bot, null: false, index: true
      t.references :season, null: false, index: true
      t.integer :match_count, default: 0, null: false
      t.integer :win_count, default: 0, null: false
    end
  end
end
