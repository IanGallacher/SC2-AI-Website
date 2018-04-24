class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, authentication_keys: [:username]
  has_many :bots, foreign_key: "owner_id"
  attr_accessor :login

  attr_writer :file
  before_update :save_avatar

  def save_avatar
    return unless @file.present?
    self.avatar = get_filename()
    File.open("public" + self.avatar, 'wb') { |file| file.write(@file.read) }
  end

  private
  def get_filename
    "/user-upload/avatar/#{username.gsub(/[^0-9A-z.\-]/, '_')}#{File.extname @file.original_filename}"
  end
end
