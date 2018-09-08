# == Schema Information
#
# Table name: bot_versions
#
#  id         :bigint(8)        not null, primary key
#  executable :string(255)      not null
#  version    :integer          not null
#  visable    :boolean          default(TRUE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  bot_id     :bigint(8)        not null
#  season_id  :bigint(8)
#
# Indexes
#
#  index_bot_versions_on_bot_id     (bot_id)
#  index_bot_versions_on_season_id  (season_id)
#

class BotVersion < ApplicationRecord
  belongs_to :bot
  belongs_to :season, optional: true

  before_save :update_version, :update_season

  def update_version
    old_version = BotVersion.where(bot_id: self.bot_id).last
    self.version = 1 # Version defaults to 1.
    return if old_version&.id == self.id
    self.version = old_version.version + 1
  end

  def update_season
    self.season_id = Season.current_season.id if self.season_id.blank?
  end
end
