FactoryBot.define do
  factory :bot do
    name { "#{Faker::Pokemon.unique.name} bot" }
    author { Faker::GameOfThrones.unique.character }
    race { %w[Terran Protoss Zerg Random].sample }
  end
end