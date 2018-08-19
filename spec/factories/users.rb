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

FactoryBot.define do
  factory :user do
    username { Faker::StarTrek.unique.character }
    email { Faker::Internet.email }
    after(:build) { |u| u.password_confirmation = u.password = 'asdfasdf' }
  end
end
