import React from "react";

export default class SchemaFactory {
  static BotNameSchema(context) {
    return {
      header: "Bot name",
      field: "name",
      sortValue: row => (row.name || "").toLowerCase(),
      onClick: row => context.props.history.push(`/bot/?bot_id=${row.id}`)
    };
  }

  static BotRaceSchema(context) {
    return {
      header: "Race",
      field: "race",
      sortValue: row => (row.race || "").toLowerCase(),
      onClick: row => context.props.history.push(`/bot/?bot_id=${row.id}`)
    };
  }

  static BotAuthorSchema(context) {
    return {
      header: "Author",
      field: "author",
      sortValue: row => (row.author || "").toLowerCase(),
      onClick: row => this.props.history.push(`/authors/?author_id=${row.author_id}`),
      optional: true
    };
  }

  static GamesWonSchema() {
    return { header: "Games Won", field: "win_count" };
  }

  static GamesPlayedSchema(context) {
    return { header: "Games Played", field: "match_count" };
  }

  static MMRSchema(context) { return { header: "MMR", field: "current_mmr" }; }

  static WinRateSchema(context) {
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
