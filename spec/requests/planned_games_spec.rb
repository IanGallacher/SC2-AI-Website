require 'swagger_helper'

describe 'Planned Games API', type: :request do
  path '/api/seasons/{season_id}/planned_games' do
    get 'Retrieves all planned games' do
      produces 'application/json'
      parameter name: :season_id, in: :path, type: :integer

      response '200', 'all planned games found' do
        schema type: 'array', items: { '$ref' => '#/definitions/planned_game' }
        before do
          @season = create(:season)
          create_list(:planned_game, 4, season: @season)
        end

        it 'should show all authors' do
          get season_planned_games_path(@season)
          planned_games = JSON.parse response.body
          expect(planned_games.count).to eq 4
        end
      end
    end
  end

  path '/api/seasons/{season_id}/planned_games/{id}' do
    get 'Retrieves a single planned game' do
      produces 'application/json'
      parameter name: :season_id, in: :path, type: :integer
      parameter name: :id, in: :path, type: :integer

      response '200', 'planned game found' do
        schema '$ref' => '#/definitions/planned_game'
        let (:season_id) { create(:season).id }
        let (:id) { create(:planned_game).id }
        run_test!
      end
    end
  end
end
