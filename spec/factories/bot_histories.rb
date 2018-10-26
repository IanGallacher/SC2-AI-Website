
FactoryBot.define do
  factory :bot_history do
    bot
    mmr { [*1000..2000].sample }
    season
  end
end
