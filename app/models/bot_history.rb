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
  before_save :calculate_mmr, :create_first_history_if_necessary
  attr_writer :competitor_mmr # the mmr of the enemy, used to calculate new mmr.
  attr_writer :score # integer representing who won.

  K_FACTOR = 10

  # We calculate the mmr that we save based on two attr_writer attributes passed
  # to us.
  def calculate_mmr
    my_history = BotHistory.where(bot_id: self.bot_id, season: self.season).last
    return if my_history.blank? || @competitor_mmr.blank? || @score.blank?
    previous_mmr = my_history.mmr
    expected = @score - expected_mmr(previous_mmr, @competitor_mmr)
    self.mmr = previous_mmr + K_FACTOR * expected
  end

  def self.add_to_season(season=Season::current_season)
    BotHistory.create(
      bot_id: bot_id,
      mmr: 1600,
      season: season,
      created_at: season.start_date
    )
  end

  def self.most_recent_result(bot_id, season=Season::current_season)
    history = BotHistory.where(bot_id: bot_id, season: season).last
    return BotHistory.create(
      bot_id: bot_id,
      mmr: 1600,
      season: season,
      created_at: season.start_date
    ) if history.blank?
    return history
  end

  private

  # If this is the first time a bot has competed this season, setup the default
  # mmr.
  def create_first_history_if_necessary
    season = self.season || Season::current_season
    return if BotHistory.find_by(bot: self, season: season).present?
    BotHistory.create(
      bot_id: self.id,
      mmr: 1600,
      season: season,
      created_at: season.start_date
    )
  end

  def expected_mmr(bot_1_rating, bot_2_rating)
    return 1 / (1 + ( 10 ** ((bot_2_rating - bot_1_rating).to_f / 400.0) ) )
  end
end
