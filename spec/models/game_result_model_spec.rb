<<<<<<< HEAD
require 'rails_helper'

describe 'Game Result Model -' do
  before do
    @game_result = FactoryBot.create(:game_result)
  end

  it 'should save the replay to disk'
  it 'should save the replay to disk'

  it 'should create a default mmr' do
    expect(BotHistory.first.mmr).to eq 1600
  end

  it 'should update mmr'
end
=======
require 'rails_helper'

describe 'Game Result Model -' do
  it 'should save the replay to disk'
  it 'should save the replay to disk'
  it 'should update mmr'
  it 'should setup relationships'
end
>>>>>>> master
