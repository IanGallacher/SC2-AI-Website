require 'rails_helper'

describe 'Bot API -', type: :request do
  before do
    @bot = FactoryBot.create(:bot)
  end

  it 'should show bots belonging to specific user' do
    get game_results_path
    results = JSON.parse response.body
    expect(results.count).to eq 4
  end
end
