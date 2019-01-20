class RemoveAuthorNameFromBot < ActiveRecord::Migration[5.1]
  def change
    remove_column :bots, :author
  end
end
