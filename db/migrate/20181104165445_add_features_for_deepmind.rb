class AddFeaturesForDeepmind < ActiveRecord::Migration[5.1]
  def change
    add_column :bots, :enabled, :boolean, after: :id, default: false, null: false
    add_column :bots, :downloadable, :boolean, after: :enabled, default: false, null: false
    add_column :bots, :license, :string, after: :author
    add_column :bots, :summary, :text, after: :race
    add_column :bots, :description, :text, after: :summary
    add_column :bots, :github, :string, after: :description
  end
end
