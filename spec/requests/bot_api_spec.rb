require 'swagger_helper'

describe 'Bot API -', type: :request do
  path '/api/bots' do
    get 'Retrieves all bots' do
      produces 'application/json'

      response '200', 'all bots found' do
        schema type: 'array', items: { '$ref' => '#/definitions/bot' }
        before do
          create_list(:bot, 4)
        end

        it 'should show all bots' do
          get bots_path
          bots = JSON.parse response.body
          expect(bots.count).to eq 4
        end
      end
    end
  end

  path '/api/bots/{id}' do
    get 'Retrieves a single bot' do
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer

      response '200', 'bot found' do
        schema '$ref' => '#/definitions/bot'
        let (:id) { create(:bot).id }
        run_test!
      end
    end
  end
end

require 'rails_helper'

shared_examples 'can view bots' do
  it 'can show one bot' do
    get bot_path(@bots[0])
    bot = JSON.parse response.body
    expect(bot['name']).to eq @bots[0].name
  end

  it 'can list all bots' do
    get bots_path
    bots = JSON.parse response.body
    expect(bots.count).to eq 4
  end
end

describe 'Bot API -', type: :request do
  before do
    @bots = create_list(:bot, 4)
  end

  context 'logged out user' do
    # Even when logged out, you can still view the bots.
    include_examples 'can view bots'

    # Logged out users cannot view bots.
    it 'fails to create bot' do
      expect(post bots_path).to eq 401
    end

    it 'fails to update bot' do
      expect(patch bot_path(@bots[1])).to eq 401
    end

    it 'fails to delete bot' do
      expect(delete bot_path(@bots[1])).to eq 401
    end
  end

  context 'bot owner' do
    before do
      bot_owner = FactoryBot.create(:user, username: 'bot_owner', email: 'bot_owner@example.com')
      bot_owner.update_attributes(role: 'user')
      post login_path, params: { username: 'bot_owner', password: 'asdfasdf' }
      @bots[1].owner = bot_owner
      @bots[1].save
    end

    # Users can view all bots.
    include_examples 'can view bots'

    # Users can CRUD owned bots.
    it 'creates owned bot' do
      bot_name = "#{Faker::Pokemon.name} bot"
      bot_race = %w[Terran Protoss Zerg Random].sample
      expect(
        post bots_path, params: {
          name: bot_name,
          race: bot_race,
          file: fixture_file_upload('bot.examp')
        }
      ).to eq 200
      expect(Bot.last.name).to eq bot_name
      expect(Bot.last.race).to eq bot_race
    end

    # Users can not create bots that share a name of an existing bot.
    it 'fails to create duplicate bot' do
      bot_name = "#{Faker::Pokemon.name} bot"
      bot_race = %w[Terran Protoss Zerg Random].sample
      expect(
        post bots_path, params: {
          name: bot_name,
          race: bot_race,
          file: fixture_file_upload('bot.examp')
        }
      ).to eq 200
      expect(
        post bots_path, params: {
          name: bot_name,
          race: bot_race,
          file: fixture_file_upload('bot.examp')
        }
      ).to eq 422
    end

    it 'updates owned bot' do
      expect(patch bot_path(@bots[1])).to eq 200
    end

    it 'deletes owned bot' do
      expect(delete bot_path(@bots[1])).to eq 200
    end

    # Users are unable to CRUD bots they do not own.
    it 'creates unowned bot'

    it 'cannot update unowned bot' do
      expect(patch bot_path(@bots[3])).to eq 403
    end

    it 'cannot delete unowned bot' do
      expect(delete bot_path(@bots[3])).to eq 403
    end
  end

  context 'site admin' do
    before do
      bot_owner = FactoryBot.create(:user, username: 'bot_owner', email: 'bot_owner@example.com')
      bot_owner.update_attributes(role: 'user')
      admin = FactoryBot.create(:user, username: 'admin', email: 'admin@example.com')
      admin.update_attributes(role: 'admin')
      post login_path, params: { username: 'admin', password: 'asdfasdf' }
      @bots[1].owner = bot_owner
    end

    # Admins can view everything.
    include_examples 'can view bots'

    # Admins can CRUD any bot.
    it 'creates any bot'

    it 'updates any bot' do
      expect(patch bot_path(@bots[0])).to eq 200
      expect(patch bot_path(@bots[1])).to eq 200
      expect(patch bot_path(@bots[2])).to eq 200
    end

    it 'deletes any bot' do
      expect(delete bot_path(@bots[0])).to eq 200
      expect(delete bot_path(@bots[1])).to eq 200
      expect(delete bot_path(@bots[2])).to eq 200
    end
  end

  after do
    # The on destroy callback will make sure we don't have any lingering
    # executables on the filesystem.
    Bot.destroy_all
  end
end
