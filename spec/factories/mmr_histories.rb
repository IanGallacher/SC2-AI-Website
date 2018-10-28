
FactoryBot.define do
  factory :bot_history do
    bot
    game_result { create(:game_result, :without_history) }
    mmr { [*1000..2000].sample }
    season
  end
end
