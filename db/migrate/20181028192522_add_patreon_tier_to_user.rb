class AddPatreonTierToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :patreon_tier, :string, after: :github
  end
end
