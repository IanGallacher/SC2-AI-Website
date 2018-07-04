require 'spec_helper'

describe 'Bot API - ' do
  context 'as logged out user - ' do
    it 'should show one bot' do
      expect false to be true
    end

    it 'should list all bots' do
    end

    it 'should not create bot' do
    end

    it 'should not upload bot' do
    end

    it 'should not update bot' do
    end

    it 'should not delete bot' do
    end
  end

  context 'as bot owner - ' do
    # Users can view anything.
    it 'should show one bot' do
    end

    it 'should list all bots' do
    end

    # Users can CRUD owned bots.
    it 'should create owned bot' do
    end

    it 'should upload owned bot' do
    end

    it 'should update owned bot' do
    end

    it 'should delete owned bot' do
    end

    # Users are unable to CRUD bots they do not own.
    it 'should not create unowned bot' do
    end

    it 'should not upload unowned bot' do
    end

    it 'should not update unowned bot' do
    end

    it 'should not delete unowned bot' do
    end
  end

  context 'as site admin - ' do
    # Admins can view anything.
    it 'should show one bot' do
    end

    it 'should list all bots' do
    end

    # Admins can CRUD any bot.
    it 'should create any bot' do
    end

    it 'should upload any bot' do
    end

    it 'should update any bot' do
    end

    it 'should delete any bot' do
    end
  end
end

