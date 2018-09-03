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
#  season_id  :bigint(8)        not null
#
# Indexes
#
#  index_bot_versions_on_bot_id     (bot_id)
#  index_bot_versions_on_season_id  (season_id)
#

class BotVersion < ApplicationRecord
  belongs_to :bot
  belongs_to :season
end
