require 'rails_helper'

describe 'Bot Model - ' do
  let(:bot) { FactoryBot.create(Bot, file: fixture_file_upload('bot.examp')) }

  it 'should save dll to disk' do
    expect(File.exist? bot.bot_filepath).to be true
  end

  it 'should find win rates against specific races'

  it 'should know current mmr' do
    expect(bot.mmr).to eq 1600
  end
end

