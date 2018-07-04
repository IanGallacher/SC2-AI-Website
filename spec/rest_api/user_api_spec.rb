require 'spec_helper'

describe 'User API - ' do
  context 'as logged out user - ' do
    it 'should show one user'
    it 'should show all users'
    it 'should not update github'
    it 'should not update avatar'
  end

  context 'as logged in user - ' do
    it 'should show one user'
    it 'should show all users'
    it 'should update own github'
    it 'should update own avatar'
  end

  context 'as admin - ' do
    it 'should show one user'
    it 'should show all users'
    it "should update any user's github"
    it "should update any user's avatar"
  end
end

