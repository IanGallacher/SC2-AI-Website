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

        it 'shows all bot histories' do
          get mmr_histories_path
          mmr_histories = JSON.parse response.body
          expect(mmr_histories.count).to eq 4
        end
      end
    end
  end

  path '/api/bots/{bot_id}/mmr_histories' do
    get 'Retrieves a single mmr history' do
      produces 'application/json'
      parameter name: :bot_id, in: :path, type: :integer

      response '200', 'shows all mmr histories for a bot' do
        schema type: 'array', items: { '$ref' => '#/definitions/mmr_history' }
        let (:bot_id) { create(:bot, :with_history).id }
        run_test!
      end
    end
  end

  path '/api/mmr_histories/{id}' do
    get 'Retrieves a single mmr history' do
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'shows a single mmr history' do
        schema '$ref' => '#/definitions/mmr_history'
        let (:id) { create(:mmr_history).id }
        run_test!
      end
    end
  end
end
