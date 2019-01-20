# == Schema Information
#
# Table name: bots
#
#  id           :bigint(8)        not null, primary key
#  author       :string(255)      not null
#  description  :text(65535)
#  downloadable :boolean          default(FALSE), not null
#  enabled      :boolean          default(FALSE), not null
#  github       :string(255)
#  license      :string(255)
#  match_count  :integer          default(0), not null
#  name         :string(255)      not null
#  race         :string(255)      not null
#  summary      :text(65535)
#  win_count    :integer          default(0), not null
#  owner_id     :bigint(8)
#
# Indexes
#
#  fk_rails_f93a12e463  (owner_id)
#
# Foreign Keys
#
#  fk_rails_...  (owner_id => users.id)
#

FactoryBot.define do
  factory :bot do
    name { "#{Faker::Pokemon.unique.name} bot" }
    race { %w[Terran Protoss Zerg Random].sample }

    trait :with_history do
      after :build do |bot|
        create_list(:mmr_history, 4, bot: bot)
      end
    end
  end
end
