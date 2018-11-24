# == Schema Information
#
# Table name: seasons
#
#  id              :bigint(8)        not null, primary key
#  end_date        :datetime
#  initial_mmr     :integer          default(1200), not null
#  mmr_method      :string(255)
#  name            :string(255)
#  planning_method :string(255)
#  start_date      :datetime
#

require 'zip'

class Season < ApplicationRecord
  MMR_METHODS = ::MMRAlgorithms.instance_methods.map(&:to_s)

  has_many :bot_season_statistics
  has_many :bots, through: :bot_season_statistics
  has_many :game_results
  has_many :planned_games
  has_many :bot_versions

  validates :mmr_method, inclusion: { in: MMR_METHODS }, allow_nil: true

  def self.current_season
    Season.last || Season.create!
  end

  def download_bots_url
    Rails.cache.fetch(download_cache_id) do
      self.update_download_zip_if_necessary
      bots_zip_path
    end
  end

  def update_download_zip_if_necessary
    Zip::File.open(bots_zip_path, Zip::File::CREATE) do |zipfile|
      self.bots.each do |bot|
        # Two arguments:
        # - The name of the file as it will appear in the archive
        # - The original file, including the path to find it
        filepath = bot.download_filepath if File.exist?(bot.download_filepath)
        zipfile.add(bot.name, filepath) if filepath.present?
      end
    end
  end

  private

  def download_cache_id
    bots_updated_at = []
    fields_to_select = [
      'bots.id',
      'bot_versions.season_id',
      'bot_versions.updated_at'
    ]

    self.bots
        .joins(:bot_versions)
        .group(*fields_to_select)
        .select(*fields_to_select)
        .each do |bot|
      bots_updated_at.push(bot.latest_version.updated_at)
    end
    return "/season/#{self.id}/#{bots_updated_at_hash}"
  end

  def bots_updated_at_hash
    bots_updated_at = []
    self.bots.each do |bot|
      bot_updated_at = bot.latest_version&.updated_at
      bots_updated_at.push(bot_updated_at) if bot_updated_at.present?
    end
    return bots_updated_at.hash
  end

  def bots_zip_path
    "public/cache/season_zip/season_#{id}_bots.zip"
  end
end
