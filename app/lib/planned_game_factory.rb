module PlannedGameFactory
  def self.simple_generation(computer_id: nil, season: nil)
    season ||= Season.current_season
  end

  def self.random_generation(computer_id: nil, season: nil)
    season ||= Season.current_season
    season_bots = season.bots
    # We loop to find unique bots.
    # We will never find two unique bots unless there is at least two bots.
    return if season_bots.size < 2
    bot_1 = season_bots.sample
    bot_2 = season_bots.sample
    while bot_1.id == bot_2.id do
      bot_2 = season_bots.sample
    end
    PlannedGame.create(season: season, bots: [bot_1, bot_2])
  end
end
