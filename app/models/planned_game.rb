# == Schema Information
#
# Table name: planned_games
#
#  id          :bigint(8)        not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  computer_id :integer
#

class PlannedGame < ApplicationRecord
  belongs_to :season
  has_many :bots_planned_games
  has_many :bots, through: :bots_planned_games
  accepts_nested_attributes_for :bots
end
