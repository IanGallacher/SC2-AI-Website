# == Schema Information
#
# Table name: bot_histories
#
#  id             :bigint(8)        not null, primary key
#  mmr            :integer          not null
#  created_at     :datetime         not null
#  bot_id         :bigint(8)        not null
#  game_result_id :bigint(8)
#  season_id      :bigint(8)        not null
#
# Indexes
#
#  index_bot_histories_on_bot_id          (bot_id)
#  index_bot_histories_on_game_result_id  (game_result_id)
#  index_bot_histories_on_season_id       (season_id)
#
# Foreign Keys
#
#  fk_rails_...  (bot_id => bots.id)
#  fk_rails_...  (game_result_id => game_results.id)
#


FactoryBot.define do
  factory :bot_history do
    bot
    mmr { [*1000..2000].sample }
    season
  end
end
