FactoryBot.define do
  factory :user do
    username { Faker::StarTrek.character }
    email { Faker::Internet.email }
    after(:build) { |u| u.password_confirmation = u.password = 'asdfasdf' }
  end
end