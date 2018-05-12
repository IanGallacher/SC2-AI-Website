class BotHistory < ApplicationRecord
  belongs_to :bot
  before_save :calculate_mmr
  attr_writer :competitor_mmr
  attr_writer :score

  K_FACTOR = 10

  def calculate_mmr
    previous_mmr = BotHistory.where(bot_id: self.bot_id).last.mmr
    self.mmr = previous_mmr + K_FACTOR * (@score - expected_mmr(previous_mmr, @competitor_mmr))
  end

  private
  def expected_mmr(bot_1_rating, bot_2_rating)
    val = 1 / (1 + ( 10 ** ((bot_2_rating - bot_1_rating).to_f / 400.0) ) )
    return val
  end
end
