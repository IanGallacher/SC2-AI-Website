require 'rails_helper'

def post_game_result
  result = %w[Player1Win Player2Win].select
  replay = fixture_file_upload('replay.examp')
  post game_results_path, params: {
    replayfile: replay,
    Result: result,
    Map: Faker::GameOfThrones.city,
    Bot1Name: FactoryBot.create(:bot).name,
    Bot2Name: FactoryBot.create(:bot).name
  }
end

shared_examples 'can view game results' do
  it 'can view all game results' do
    get game_results_path
    results = JSON.parse response.body
    expect(results.count).to eq 4
  end
end

describe 'Game Result API -', type: :request do
  before do
    @results = create_list(:game_result, 4)
  end

  context 'a non admin' do # Any user that is not an admin, logged in or not.
    before do
      regular_user = FactoryBot.create(
        :user,
        username: 'regular_user',
        email: 'regular_user@example.com'
      )
      regular_user.update_attributes(role: 'user')
      post login_path, params: {
        username: 'regular_user',
        password: 'asdfasdf'
      }
    end

    # Any user can view game result data.
    include_examples 'can view game results'

    # Non admins cannot manage game results.
    it 'cannot create game result' do
      expect(post_game_result).to eq 403
    end

    # it 'cannot edit game result' do
    #   expect(patch "/api/game_results/#{@result0.id}").to raise_error(ActionController::RoutingError)
    # end
    #
    # it 'cannot delete game result' do
    #   expect(delete "/api/game_results/#{@result0.id}").to raise_error(ActionController::RoutingError)
    # end
  end

  context 'a admin' do
    before do
      admin = FactoryBot.create(:user, username: 'admin', email: 'admin@example.com')
      admin.update_attributes(role: 'admin')
      post login_path, params: { username: 'admin', password: 'asdfasdf' }
    end

    # Any user can view game result data.
    include_examples 'can view game results'

    # Admins can create and edit game results.
    it 'can create game result' do
      expect(post_game_result).to eq 200
    end

    # it 'can edit game result' do
    #   expect(patch "/api/game_results/#{@result0.id}").to raise_error(ActionController::RoutingError)
    # end
    #
    # # Not even admins can 1984 our history!
    # it 'cannot delete game result' do
    #   delete "/api/game_results/#{@result0.id}"
    #   expect(delete "/api/game_results/#{@result0.id}").to raise_error(ActionController::RoutingError)
    # end
  end
end
