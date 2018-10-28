require 'rails_helper'

describe 'Game Result Model -' do
  before do
    @game_result = FactoryBot.create(:game_result, winner: nil)
  end

  it 'should update the counters correctly when creating' do
    @game_result.bots.first.match_count == 1
    @game_result.bots.second.match_count == 1
    expect(@game_result.bots.first.win_count).to eq 0
    expect(@game_result.bots.second.win_count).to eq 0
  end

  it 'should update the counters correctly when updating' do
    @game_result.update_attributes(winner: @game_result.bots.first)
    expect(@game_result.bots.first.win_count).to eq 1
    expect(@game_result.bots.second.win_count).to eq 0
    @game_result.update_attributes(winner: @game_result.bots.second)
    # Active record refuses to update nested models from the hooks.
    # Let's reload.
    first_bot = Bot.find(@game_result.bots.first.id)
    second_bot = Bot.find(@game_result.bots.second.id)
    # Carry on with the test.
    expect(first_bot.win_count).to eq 0
    expect(second_bot.win_count).to eq 1
  end

  it 'should create a default mmr' do
    expect(MmrHistory.first.mmr).to eq MmrHistory.first.season.initial_mmr
  end

  it 'should save the replay to disk'
  it 'should update mmr'
end
