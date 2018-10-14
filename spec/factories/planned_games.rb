# == Schema Information
#
# Table name: planned_games
#
#  id           :bigint(8)        not null, primary key
#  requested_on :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  computer_id  :integer
#  season_id    :bigint(8)
#
# Indexes
#
#  index_planned_games_on_season_id  (season_id)
#

FactoryBot.define do
  factory :planned_game do
    season { build(:season) }

    trait :reserved do
      computer_id { [*0..9].sample }
      reserved_on { Time.utc.now }
    end
  end
end
