require 'spec_helper'

describe 'Bot API - ' do
  context 'as logged out user - ' do
    it 'should show one bot'
    it 'should list all bots'
    it 'should not create bot'
    it 'should not upload bot'
    it 'should not update bot'
    it 'should not delete bot'
  end

  context 'as bot owner - ' do
    # Users can view anything.
    it 'should show one bot'
    it 'should list all bots'
    # Users can CRUD owned bots.
    it 'should create owned bot'
    it 'should upload owned bot'
    it 'should update owned bot'
    it 'should delete owned bot'
    # Users are unable to CRUD bots they do not own.
    it 'should not create unowned bot'
    it 'should not upload unowned bot'
    it 'should not update unowned bot'
    it 'should not delete unowned bot'
  end

  context 'as site admin - ' do
    # Admins can view anything.
    it 'should show one bot'
    it 'should list all bots'
    # Admins can CRUD any bot.
    it 'should create any bot'
    it 'should upload any bot'
    it 'should update any bot'
    it 'should delete any bot'
  end
end

