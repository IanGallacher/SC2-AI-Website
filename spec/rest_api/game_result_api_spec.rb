require 'spec_helper'

describe 'Game Result API - ' do
  context 'as non admin -' do # Any user that is not an admin, logged in or not.
    # Any user can view game result data.
    it 'should show specific game result' do
    end

    it 'should show all game results' do
    end

    # Non admins can not manage game results.
    it 'should not create game result' do
    end

    it 'should not edit game result' do
    end

    it 'should not delete game result' do
    end
  end

  context 'as admin -' do
    # Any user can view game result data.
    it 'should show specific game result' do
    end

    it 'should all game results' do
    end

    # Admins can create and edit game results.
    it 'should create game result' do
    end

    it 'should edit game result' do
    end

    # Not even admins can 1984 our history!
    it 'should not delete game result' do
    end
  end
end
