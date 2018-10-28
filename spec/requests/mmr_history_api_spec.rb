require 'swagger_helper'

describe 'MMR History API -', type: :request do
  path '/api/mmr_histories' do
    get 'Retrieves all bot histories' do
      produces 'application/json'

      response '200', 'all bot histories found' do
        schema type: 'array', items: { '$ref' => '#/definitions/mmr_history' }
        before do
          create_list(:mmr_history, 4)
        end

        it 'should show all bot histories' do
          get mmr_histories_path
          mmr_histories = JSON.parse response.body
          expect(mmr_histories.count).to eq 4
        end
      end
    end
  end

  path '/api/mmr_histories/{id}' do
    get 'Retrieves a single mmr history' do
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'mmr history found' do
        schema '$ref' => '#/definitions/mmr_history'
        let (:id) { create(:mmr_history).id }
        run_test!
      end
    end
  end
end

require 'rails_helper'

describe 'MMR History API -', type: :request do
  before do
    @bots = create_list(:bot, 4)
    FactoryBot.create(:game_result, bots: [@bots[0], @bots[1]])
  end

  it 'shows one history entry' do
    get mmr_history_path(@bots[0])
    history = JSON.parse response.body
    # A bot can have more than one history.
    # Get the first one, and make sure we fetched the right bot.
    expect(history.first['id']).to eq @bots[0].mmr_histories.first.id
  end

  it 'shows all bot histories' do
    get mmr_histories_path
    history = JSON.parse response.body
    expect(history.count).to eq 2
  end
end
