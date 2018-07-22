FactoryBot.define do
  factory :user do
    username { Faker::Name.name }
    email { Faker::Internet.email }
    after(:build) { |u| u.password_confirmation = u.password = 'asdfasdf' }
  end
end
