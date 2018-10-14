require 'swagger_helper'

describe 'Planned Games API', type: :request do
  path '/api/seasons/{season_id}/next_game' do
    get 'Creates or fetches the next game for a specific computer' do
      produces 'application/json'
      parameter name: :season_id, in: :path, type: :integer

      response '200', 'grabs the next game for the requested computer' do
        schema '$ref' => '#/definitions/planned_game'

        let (:computer_id) { 1 }

        let (:next_game) {
          sign_in_as_admin
          get(season_next_game_path(@season), params: { computer_id: computer_id })
          JSON.parse response.body
        }

        before do
          @season = create(:season)
          create_list(:planned_game, 4, season: @season)
        end

        it 'reserves the next game' do
          expect(next_game['computer_id']).to eq computer_id
        end

        it 'reserves only one game' do
           # When using let, you must reference it at least once to be setup.
          initialized_game = next_game
          expect(PlannedGame.where(computer_id: computer_id).count).to eq 1
        end

        it 'grabs the existing reserved game' do
          PlannedGame.last.update_attributes(computer_id: computer_id)
          expect(next_game['computer_id']).to eq computer_id
        end
      end
    end
  end
end
