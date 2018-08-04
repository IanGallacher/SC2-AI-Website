class AddBotSeasonRelations < ActiveRecord::Migration[5.1]
  def change
    create_table :bot_season_statistics do |t|
      t.references :bot, null: false, index: true
      t.references :season, null: false, index: true
    end

    remove_column :bots, :match_count
    remove_column :bots, :win_count
  end
end
