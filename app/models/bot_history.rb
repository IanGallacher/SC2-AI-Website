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

class BotHistory < ApplicationRecord
  belongs_to :bot
  belongs_to :season
  belongs_to :game_result

  before_save :calculate_mmr, :create_first_history_if_necessary
  attr_writer :competitor_mmr # the mmr of the enemy, used to calculate new mmr.
  attr_writer :score # integer representing who won.
  attr_writer :change_mmr_by # If present, manually change mmr instead of using algorithm.

  K_FACTOR = 10

  # We calculate the mmr that we save based on two attr_writer attributes passed
  # to us.
  def calculate_mmr
    my_history = BotHistory.where(bot_id: self.bot_id, season: self.season).last
    self.mmr = season.initial_mmr
    self.mmr += @change_mmr_by if @change_mmr_by.present?
    return if my_history.blank?
    previous_mmr = my_history.mmr
    # If we are passing in an explicit mmr, use that.
    self.mmr = previous_mmr + @change_mmr_by if @change_mmr_by.present?
    return if @change_mmr_by.present? || @competitor_mmr.blank? || @score.blank?
    # Otherwise use the elo algorithm.
    expected = @score - expected_mmr(previous_mmr, @competitor_mmr)
    self.mmr = previous_mmr + K_FACTOR * expected
  end

  def self.add_to_season(season=Season::current_season)
    BotHistory.create(
      bot_id: bot_id,
      mmr: season.initial_mmr,
      season: season,
      created_at: season.start_date
    )
  end

  def self.most_recent_result(bot_id, season=Season::current_season)
    history = BotHistory.where(bot_id: bot_id, season: season).last
    return BotHistory.create(
      bot_id: bot_id,
      mmr: season.initial_mmr,
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
      mmr: season.initial_mmr,
      season: season,
      created_at: season.start_date
    )
  end

  def expected_mmr(bot_1_rating, bot_2_rating)
    return 1 / (1 + ( 10 ** ((bot_2_rating - bot_1_rating).to_f / 400.0) ) )
  end
end
