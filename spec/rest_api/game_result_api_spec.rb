require 'spec_helper'

describe 'Game Result API - ' do
  context 'as non admin -' do # Any user that is not an admin, logged in or not.
    # Any user can view game result data.
    it 'should show specific game result'
    it 'should show all game results'
    # Non admins can not manage game results.
    it 'should not create game result'
    it 'should not edit game result'
    it 'should not delete game result'
  end

  context 'as admin -' do
    # Any user can view game result data.
    it 'should show specific game result'
    it 'should all game results'
    # Admins can create and edit game results.
    it 'should create game result'
    it 'should edit game result'
    # Not even admins can 1984 our history!
    it 'should not delete game result'
  end
end
