namespace :legacy_db do
  desc 'Create a new record for ALL data from the legacy php ladder database.'
  task import: :environment do
    begin
      # The created_at columns will get copied from the old database.
      # Don't let rails set it for us!
      ActiveRecord::Base.record_timestamps = false
      # What the old database called seasonids, we call seasons.
      # What the old database called seasons, we call bot_season_statistics.
      # bot_season_statistics is updated automatically, no need to import.
      php_seasons = php_database.query('SELECT * FROM seasonids').to_a
      php_results = php_database.query('SELECT * FROM results').to_a
      php_bots = php_database.query('SELECT * FROM participants').to_a
      php_members = php_database.query('SELECT * FROM members').to_a
      # Create the bots before seasons in order to give each bot a starting mmr
      # per season.
      import_php_bots(php_bots, php_members)
      import_php_seasons(php_seasons)
      import_php_results(php_results, php_bots, php_members, php_seasons)
    ensure
      # Even if the rake import fails for whatever reason, we want rails to
      # start managing the created_at timestamp for us again.
      ActiveRecord::Base.record_timestamps = true
    end
  end

  def import_php_bots(php_bots, php_members)
    php_bots.each do |bot|
      # We need a entry for bots, even if they are marked deleted.
      # Otherwise, we won't be able to create match history for them.
      # We mark the record deleted at some future point.
      # next if bot['Deleted'] == 1
      user_hash = php_members.find { |m| m['id'] == bot['Author'] }
      next if user_hash.blank?
      user = find_or_create_user(user_hash)
      find_or_create_bot(bot, user)
    end
  end

  def import_php_seasons(php_seasons)
    php_seasons.each do |season|
      Season.create!(
        name: season['SeasonName'],
        start_date: season['StartDate'],
        end_date: season['EndDate']
      )
    end
  end

  def import_php_results(php_results, php_bots, php_members, php_seasons)
    php_results.each do |result|
      bot_1_hash = php_bots.find { |bot| bot['ID'] == result['Bot1'] }
      bot_2_hash = php_bots.find { |bot| bot['ID'] == result['Bot2'] }
      bot_winner = php_bots.find { |bot| bot['ID'] == result['Winner'] }
      season = php_seasons.find { |season| season['id'] == result['SeasonId'] }
      next if bot_1_hash.blank?
      next if bot_2_hash.blank?
      next if bot_winner.blank?
      next if season.blank?
      next if result['Date'].blank?
      bot_ids = []
      bot_ids.push Bot.where(name: bot_1_hash['Name']).first.id
      bot_ids.push Bot.where(name: bot_2_hash['Name']).first.id
      GameResult.create!(
        map: (result['Map'] || 'map missing'),
        bot_ids: bot_ids,
        winner_id: Bot.where(name: bot_winner['Name']).first.id,
        created_at: result['Date'],
        season_id: Season.find_by(name: season['SeasonName']).id,
        replay: result['ReplayFile']
      )
    end
  end

  def convert_members(php_members)
    php_members.each do |member|
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

  def php_database
    @client ||= Mysql2::Client.new(
      Rails.configuration.database_configuration['legacy']
    )
  end
end