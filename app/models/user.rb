# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  avatar                 :string(255)
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string(255)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  github                 :string(255)
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string(255)
#  patreon_tier           :string(255)
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  role                   :string(255)      default("user")
#  sign_in_count          :integer          default(0), not null
#  username               :string(255)      not null
#  website                :string(255)      default(""), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_username              (username) UNIQUE
#

class User < ApplicationRecord
  PATREON_TIERS = %w[Bronze Silver Gold].freeze
  GAME_MANAGEMENT_ROLES = %w[admin game_reporter].freeze

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, authentication_keys: [:username]

  has_many :bots, foreign_key: "owner_id"

  before_update :save_avatar

  attr_accessor :login
  attr_writer :file

  validates :github, http_url: true, allow_nil: true
  validates :website, http_url: true, allow_blank: true
  validates :patreon_tier, inclusion: { in: PATREON_TIERS }, allow_nil: true
  validates :username, presence: true, uniqueness: { case_sensitive: false }

  def save_avatar
    return unless @file.present?
    self.avatar = get_filename()
    File.open("public" + self.avatar, 'wb') { |file| file.write(@file.read) }
  end

  def can_report_games?
    role.in? GAME_MANAGEMENT_ROLES
  end

  private

  def get_filename
    "/user-upload/avatar/#{username.gsub(/[^0-9A-z.\-]/, '_')}#{File.extname @file.original_filename}"
  end
end
