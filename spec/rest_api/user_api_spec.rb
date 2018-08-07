require 'rails_helper'

def github_test(user, github_url, result=200)
  expect(patch user_path(user), params: { github: github_url }).to eq result
  expect(User.find(user.id).github).to eq github_url if result == 200
end

describe 'User API -', type: :request  do
  context 'a logged out user' do
    before do
      @standard_user = FactoryBot.create(:user, username: 'standard_user', email: 'standard_user@example.com')
    end

    it 'cannot view logged_in_user'do
      get users_path
      expect(response.body).to eq 'null'
    end

    it 'cannot update github' do
      github_test(@standard_user, 'https://github.com/logged_in_user/', 401)
    end

    it 'cannot update avatar'
  end

  context 'a logged in user' do
    before do
      @logged_in_user = FactoryBot.create(:user, username: 'the_user', email: 'the_user@example.com')
      post login_path, params: { username: 'the_user', password: 'asdfasdf' }
    end

    it 'should show the current_user' do
      get users_path
      user = JSON.parse response.body
      expect(user['username']).to eq @logged_in_user.username
    end

    it 'can update own github' do
      github_test(@logged_in_user, 'https://github.com/logged_in_user/')
    end

    it 'can update own avatar'
  end

  context 'a admin' do
    before do
      @regular_user = FactoryBot.create(:user, username: 'regular_user', email: 'regular_user@example.com')
      @regular_user.update_attributes(role: 'user')

      @admin = FactoryBot.create(:user, username: 'admin', email: 'admin@example.com')
      @admin.update_attributes(role: 'admin')
      post login_path, params: { username: 'admin', password: 'asdfasdf' }
    end

    it 'should show the current_user' do
      get users_path
      user = JSON.parse response.body
      expect(user['username']).to eq @admin.username
    end

    it "can update any user's github" do
      github_test(@regular_user, 'https://github.com/regular_user/')
    end

    it "can update any user's avatar"
  end
end

