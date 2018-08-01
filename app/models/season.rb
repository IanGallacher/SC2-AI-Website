# == Schema Information
#
# Table name: seasons
#
#  id         :bigint(8)        not null, primary key
#  end_date   :datetime
#  name       :string(255)
#  start_date :datetime
#

class Season < ApplicationRecord
  has_many :game_results
  after_create :create_histories

  def create_histories
    Bot.all.each { |bot| bot.create_history(self) }
  end
end
