namespace :legacy_db do
  desc "Import ALL data from the php ladder database, no duplicate checking."
  task import: :environment do
    begin
      ActiveRecord::Base.record_timestamps = false
      legacy_seasons = legacy_database.query("SELECT * FROM seasons").to_a
      legacy_seasonids = legacy_database.query("SELECT * FROM seasonids").to_a
      legacy_results = legacy_database.query("SELECT * FROM results").to_a
      legacy_bots = legacy_database.query("SELECT * FROM participants").to_a
      legacy_members = legacy_database.query("SELECT * FROM members").to_a
      # Create the bots before seasons in order to give each bot a starting mmr per season.
      convert_bots(legacy_bots, legacy_members)
      convert_seasons(legacy_seasonids)
      convert_results(legacy_results, legacy_bots, legacy_members, legacy_seasonids)
    ensure
      ActiveRecord::Base.record_timestamps = true  # don't forget to enable it again!
    end
  end

  def convert_seasons(legacy_seasonids)
    legacy_seasons = legacy_seasonids
    legacy_seasons.each do |season|
      Season.create!(
        name: season['SeasonName'],
        start_date: season['StartDate'],
        end_date: season['EndDate'],
        bots: Bot.all
      )
    end
  end

  def convert_results(legacy_results, legacy_bots, legacy_members, legacy_seasonids)
    legacy_results.each do |result|
      bot_1_hash = legacy_bots.detect { |bot| bot['ID'] == result['Bot1'] }
      bot_2_hash = legacy_bots.detect { |bot| bot['ID'] == result['Bot2'] }
      bot_winner = legacy_bots.detect { |bot| bot['ID'] == result['Winner'] }
      season = legacy_seasonids.detect { |season| season['id'] == result['SeasonId'] }
      next if bot_1_hash.blank?
      next if bot_2_hash.blank?
      next if bot_winner.blank?
      next if season.blank?
      next if result['Date'].blank?
      puts result if season.blank?
      bot_ids = []
      bot_ids.push Bot.where(name: bot_1_hash['Name']).first.id
      bot_ids.push Bot.where(name: bot_2_hash['Name']).first.id
      GameResult.create!(
        map: (result['Map'] || 'map missing'),
        bot_ids: bot_ids,
        winner_id: Bot.where(name: bot_winner['Name']).first.id,
        created_at: result['Date'],
        season_id: Season.find_by(name: season['SeasonName']).id
      )
    end
  end

  def convert_bots(legacy_bots, legacy_members)
    legacy_bots.each do |bot|
      next if bot['Deleted'] == 1
      user_hash = legacy_members.detect { |m| m['id'] == bot['Author'] }
      next if user_hash.blank?
      user = find_or_create_user(user_hash)
      find_or_create_bot(bot, user)
    end
  end

  def convert_members(legacy_members)
    legacy_members.each do |member|
      next if member['verified'] != 1
      find_or_create_user(member)
    end
  end

  def find_or_create_user(user_hash)
    user ||= User.find_by(username: user_hash['username'])
    user ||= User.find_by(email: user_hash['email'])
    user ||= User.create!(
      username: user_hash['username'],
      email: user_hash['id'] + '@example.com',
      password: Faker::Internet.password(min_length = 32, max_length = 64),
      created_at: user_hash['Joined'],
      updated_at: user_hash['mod_timestamp'],
      github: user_hash['Github'],
      website: (user_hash['Website'] || '')
    )
    return user
  end

  def find_or_create_bot(bot_hash, author)
    races = %w[Terran Zerg Protoss Random]
    bot ||= Bot.find_by(name: bot_hash['Name'])
    bot ||= Bot.create!(
      name: bot_hash['Name'],
      author: author.username,
      owner_id: author.id,
      race: races[bot_hash['Race']]
    )
    return bot
  end

  def legacy_database
    @client ||= Mysql2::Client.new(
      Rails.configuration.database_configuration['legacy']
    )
  end
end