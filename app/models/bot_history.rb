# == Schema Information
#
# Table name: bot_histories
#
#  id         :bigint(8)        not null, primary key
#  mmr        :integer          not null
#  created_at :datetime         not null
#  bot_id     :bigint(8)        not null
#  season_id  :bigint(8)        not null
#
# Indexes
#
#  index_bot_histories_on_bot_id     (bot_id)
#  index_bot_histories_on_season_id  (season_id)
#
# Foreign Keys
#
#  fk_rails_...  (bot_id => bots.id)
#

class BotHistory < ApplicationRecord
  belongs_to :bot
  belongs_to :season
  before_save :calculate_mmr
  attr_writer :competitor_mmr
  attr_writer :score

  K_FACTOR = 10

  def calculate_mmr
    my_history = BotHistory.where(bot_id: self.bot_id, season: self.season).last
    return if my_history.nil?
    previous_mmr = my_history.mmr
    self.mmr = previous_mmr + K_FACTOR * (@score - expected_mmr(previous_mmr, @competitor_mmr))
  end

  private
  def expected_mmr(bot_1_rating, bot_2_rating)
    return 1 / (1 + ( 10 ** ((bot_2_rating - bot_1_rating).to_f / 400.0) ) )
  end
end
