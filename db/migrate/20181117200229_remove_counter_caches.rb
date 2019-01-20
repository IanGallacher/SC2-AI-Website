class RemoveCounterCaches < ActiveRecord::Migration[5.1]
  def change
    def change
      remove_column :bot_season_statistics, :match_count
      remove_column :bot_season_statistics, :win_count
      remove_column :bots, :win_count
    end
  end
end
