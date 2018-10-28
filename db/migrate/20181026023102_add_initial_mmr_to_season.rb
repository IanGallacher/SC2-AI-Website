class AddInitialMmrToSeason < ActiveRecord::Migration[5.1]
  def change
    add_column :seasons, :initial_mmr, :integer, after: :mmr_method, null: false, default: 1200
  end
end
