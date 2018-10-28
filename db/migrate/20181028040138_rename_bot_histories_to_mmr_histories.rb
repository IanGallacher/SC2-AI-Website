class RenameBotHistoriesToMmrHistories < ActiveRecord::Migration[5.1]
  def self.up
    rename_table :bot_histories, :mmr_histories
  end

  def self.down
    rename_table :mmr_histories, :bot_histories
  end
end
