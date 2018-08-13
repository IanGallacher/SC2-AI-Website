require 'rails_helper'

describe 'Bot Model -' do
  let(:bot) { FactoryBot.create(:bot, file: fixture_file_upload('bot.examp')) }

  it 'should save dll to disk' do
    expect(File.exist? bot.bot_filepath).to be true
  end

  it 'should find win rates against specific races'

  it 'should know current mmr' do
    expect(bot.current_mmr).to eq 1600
  end

  after do
    # The destroy executable method is protected so we don't accidently call it.
    # Sending the command directly to the object gets around this.
    bot.send(:destroy_bot_executable)
  end
end

