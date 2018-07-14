FactoryBot.define do
  factory :bot do
    name { "#{Faker::Pokemon.name} bot" }
    author { Faker::GameOfThrones.character }
    race { %w[Terran Protoss Zerg Random].sample }
  end
end