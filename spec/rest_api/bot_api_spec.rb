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

  context 'a logged out user' do
    # Even when logged out, you can still view the bots.
    include_examples 'can view bots'

    # Logged out users cannot view bots.
    it 'cannot create bot' do
      expect(post bots_path).to eq 401
    end

    it 'cannot update bot' do
      expect(patch bot_path(@bots[1])).to eq 401
    end

    it 'cannot delete bot' do
      expect(delete bot_path(@bots[1])).to eq 401
    end
  end

  context 'a bot owner' do
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
    it 'can create owned bot' do
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
      Bot.last.send(:destroy_bot_executable)
    end

    it 'can update owned bot' do
      expect(patch bot_path(@bots[1])).to eq 200
    end

    it 'can delete owned bot' do
      expect(delete bot_path(@bots[1])).to eq 200
    end

    # Users are unable to CRUD bots they do not own.
    it 'cannot create unowned bot'

    it 'cannot update unowned bot' do
      expect(patch bot_path(@bots[3])).to eq 403
    end

    it 'cannot delete unowned bot' do
      expect(delete bot_path(@bots[3])).to eq 403
    end
  end

  context 'a site admin' do
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
    it 'can create any bot'

    it 'can update any bot' do
      expect(patch bot_path(@bots[0])).to eq 200
      expect(patch bot_path(@bots[1])).to eq 200
      expect(patch bot_path(@bots[2])).to eq 200
    end

    it 'can delete any bot' do
      expect(delete bot_path(@bots[0])).to eq 200
      expect(delete bot_path(@bots[1])).to eq 200
      expect(delete bot_path(@bots[2])).to eq 200
    end
  end
end

