class AddMmrMethodToSeason < ActiveRecord::Migration[5.1]
  def change
    add_column :seasons, :mmr_method, :string, after: :name, null: false
  end
end
