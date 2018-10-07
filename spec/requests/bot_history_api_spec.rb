require 'rails_helper'

describe 'Bot History API -', type: :request do
  before do
    @bots = create_list(:bot, 4)
    FactoryBot.create(:game_result, bots: [@bots[0], @bots[1]])
  end

  it 'should show history of one bot' do
    get bot_history_path(@bots[0])
    history = JSON.parse response.body
    # A bot can have more than one history.
    # Get the first one, and make sure we fetched the right bot.
    expect(history.first['id']).to eq @bots[0].bot_histories.first.id
  end

  it 'should show all bot histories' do
    get bot_histories_path
    history = JSON.parse response.body
    expect(history.count).to eq 4
  end
end
