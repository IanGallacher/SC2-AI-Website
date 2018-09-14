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

  before_save :set_executable, :set_version, :set_season
  before_destroy :destroy_bot_executable

  attr_writer :file

  def set_executable
    self.executable = download_url
  end

  def set_version
    old_version = BotVersion.where(bot_id: self.bot_id).last
    self.version = 1 # Version defaults to 1.
    return if old_version&.id == self.id
    self.version = old_version.version + 1
  end

  def set_season
    self.season_id = Season.current_season.id if self.season_id.blank?
  end

  def destroy_bot_executable
    return unless self.executable.present?
    File.delete("#{download_filepath}")
  end

  def download_url
    return "#{bot_urlroot}#{bot_filename}"
  end

  def download_filepath
    return "#{bot_directory}#{bot_filename}"
  end

  private

  def bot_directory
    return "public/user-upload/dll/"
  end

  # Things are uploaded to the public folder, but public is not part of the url.
  def bot_urlroot
    return '/user-upload/dll/'
  end

  def bot_file_extension
    return '' if @file.blank?
    return File.extname @file.path
  end

  def bot_filename
    return File.basename(executable) if executable.present?
    return "#{bot.name.gsub(/[^0-9A-z.\-]/, '_')}#{id}#{bot_file_extension}"
  end
end
