class AddLegacyColumns < ActiveRecord::Migration[5.1]
  def change
    create_table :seasons do |t|
      t.string :name
      t.datetime :start_date
      t.datetime :end_date
    end

    add_reference :bot_histories, :season, null: false
    add_reference :game_results, :season, null: false
    add_column :users, :website, :string, after: :github, null: false, default: ''
  end
end
