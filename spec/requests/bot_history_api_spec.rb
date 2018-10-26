require 'swagger_helper'

describe 'Author API -', type: :request do
  path '/api/bot_histories' do
    get 'Retrieves all bot histories' do
      produces 'application/json'

      response '200', 'all bot histories found' do
        schema type: 'array', items: { '$ref' => '#/definitions/bot_history' }
        before do
          create_list(:bot_history, 4)
        end

        it 'should show all authors' do
          get bot_histories_path
          bot_histories = JSON.parse response.body
          expect(bot_histories.count).to eq 4
        end
      end
    end
  end

  path '/api/bot_histories/{id}' do
    get 'Retrieves a single bot history' do
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'bot history found' do
        schema '$ref' => '#/definitions/bot_history'
        let (:id) { FactoryBot.create(:bot_history).id }
        run_test!
      end
    end
  end
end

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
