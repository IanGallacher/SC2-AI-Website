class AddPlanningMethodToSeason < ActiveRecord::Migration[5.1]
  def change
    add_column :seasons, :planning_method, :string, after: :mmr_method
  end
end
