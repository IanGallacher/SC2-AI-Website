class CreateTables < ActiveRecord::Migration[5.1]
  def change
    create_table :bots do |t|
      t.string :name, null: false
      t.string :author, null: false
      t.string :race, null: false
      t.string :dll, null: false
      t.integer :match_count, default: 0, null: false
      t.integer :win_count, default: 0, null: false
    end
  end
end
