require 'rails_helper'

describe 'Bot Model -' do
  let(:bot) { FactoryBot.create(:bot, file: fixture_file_upload('bot.examp')) }

  it 'should save dll to disk' do
    expect(File.exist? bot.download_filepath).to be true
  end

  it 'should delete dll on destroy'

  it 'should find win rates against specific races'

  after do
    # Be sure to get rid of any files created from the test.
    # The bot_version before_destroy callback will delete any saved executables.
    bot.destroy
  end
end
