class AddGithubToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :github, :string
  end
end
