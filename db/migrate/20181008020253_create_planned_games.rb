class CreatePlannedGames < ActiveRecord::Migration[5.1]
  def change
    create_table :planned_games do |t|
      t.integer :computer_id
      t.datetime :requested_on
      t.belongs_to :season

      t.timestamps
    end

    create_table :bots_planned_games do |t|
      t.belongs_to :bot, foreign_key: true
      t.belongs_to :planned_game, foreign_key: true

      t.timestamps
    end
  end
end
