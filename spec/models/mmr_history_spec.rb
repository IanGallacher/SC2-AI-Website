# == Schema Information
#
# Table name: mmr_histories
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
#  index_mmr_histories_on_bot_id          (bot_id)
#  index_mmr_histories_on_game_result_id  (game_result_id)
#  index_mmr_histories_on_season_id       (season_id)
#
# Foreign Keys
#
#  fk_rails_...  (bot_id => bots.id)
#  fk_rails_...  (game_result_id => game_results.id)
#

require 'rails_helper'

RSpec.describe MmrHistory, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
