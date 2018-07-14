include ActionDispatch::TestProcess

FactoryBot.define do
  factory :game_result do
    map { Faker::GameOfThrones.city }
    replay { fixture_file_upload('spec/fixtures/replay.examp') }
    bots { create_list(:bot, 2) }
  end
end