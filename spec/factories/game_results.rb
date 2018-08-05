# == Schema Information
#
# Table name: game_results
#
#  id         :bigint(8)        not null, primary key
#  map        :string(255)      not null
#  replay     :string(255)
#  created_at :datetime
#  season_id  :bigint(8)        not null
#  winner_id  :bigint(8)
#
# Indexes
#
#  fk_rails_f187e71c0b              (winner_id)
#  index_game_results_on_season_id  (season_id)
#
# Foreign Keys
#
#  fk_rails_...  (winner_id => bots.id)
#

include ActionDispatch::TestProcess

FactoryBot.define do
  factory :game_result do
    map { Faker::GameOfThrones.city }
    replay { fixture_file_upload('spec/fixtures/replay.examp') }
    season { Season.first || create(:season) }
    bots { create_list(:bot, 2) }
  end
end
