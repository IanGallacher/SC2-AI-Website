export default class SchemaFactory {
  static BotNameSchema(context) {
    return {
      header: "Bot name",
      field: "name",
      sortValue: row => (row.name || "").toLowerCase(),
      onClick: row => {
        let bot_id = row.bot_id || row.id;
        context.props.history.push(`/bot/?bot_id=${bot_id}`);
      }
    };
  }

  static BotRaceSchema(context) {
    return {
      header: "Race",
      field: "race",
      sortValue: row => (row.race || "").toLowerCase(),
      onClick: row => context.props.history.push(`/bots/?race=${row.race}`)
    };
  }

  static BotAuthorSchema(context) {
    return {
      header: "Author",
      field: "author",
      sortValue: row => (row.author || "").toLowerCase(),
      onClick: row => {
        let owner_id = row.author_id || row.owner_id;
        context.props.history.push(`/authors/?author_id=${owner_id}`);
      },
      optional: true
    };
  }

  static GamesWonSchema() {
    return { header: "Games Won", field: "win_count" };
  }

  static GamesPlayedSchema() {
    return { header: "Games Played", field: "match_count" };
  }

  static MMRSchema() { return { header: "MMR", field: "current_mmr" }; }

  static WinRateSchema() {
    return {
      header: "Win rate",
      sortValue: row => {
        // Avoid dividing by 0.
        if(row.match_count === 0) return ("N/A");
        let win_ratio = row.win_count / row.match_count;
        return `${win_ratio.toFixed(2) * 100}%`;
      },
      render: row => {
        // Avoid dividing by 0.
        if(row.match_count === 0) return ("N/A");
        let win_ratio = row.win_count / row.match_count;
        return `${win_ratio.toFixed(2) * 100}%`;
      }
    };
  }
}
