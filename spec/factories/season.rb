FactoryBot.define do
  factory :season do
    name { Faker::LordOfTheRings.unique.location }
  end
end