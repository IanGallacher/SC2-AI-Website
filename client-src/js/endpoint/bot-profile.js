import axios from "axios";
import moment from "moment";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import { SeasonSelector, SeasonContext } from "./../context/season-context.js";
import LoadingAnimation from "./../component/loading.jsx";
import { SimpleLineChart } from "./../component/chart.jsx";
import WinRatePieChart from "./../component/win-rate-pie-chart.jsx";

import FetchTable from "./../table/table-fetch.jsx";

class BotProfile extends React.Component {
  static contextType = SeasonContext;

  constructor(props) {
    super(props);
    this.state = { bot: null };
  }

  static propTypes = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired
  }

  componentDidMount() {
    let axios_url = `${API_URL}/bots/${this.getBotId()}`;
    axios.get(axios_url)
      .then(response => this.setState({ bot: response.data }));
    this.updateBotData(this.getBotId());
  }

  UNSAFE_componentWillReceiveProps() {
    this.updateBotData(this.getBotId());
  }

  updateBotData(bot_id) {
    let season_id = this.context.selected.id;
    if(this.state.old_season == season_id) return null;
    axios.get(`${API_URL}/bots/${bot_id}?season_id=${season_id}`)
      .then(response => this.setState({ bot: response.data }) );
    axios.get(`${API_URL}/bots/${bot_id}/mmr_histories/?season_id=${season_id}`)
      .then(response => this.setState({ mmr_history: response.data }));
    this.setState({ old_season: season_id });
  }

  getBotId() {
    let bot_id = -1;
    const search = this.props.location.search;
    if(search != "") {
      const params = new URLSearchParams(search);
      bot_id = params.get("bot_id") || bot_id;
    }
    return bot_id;
  }

  renderDownloadButton = (bot) => {
    if (bot.downloadable)
      return <a download href={`/api/bots/${bot.id}.zip`} className="btn btn-md">
        Download Bot
      </a>;
    else
      return <p className="bot-text">
        Sorry, this bot is not available for download
      </p>;
  }

  render() {
    const bot = this.state.bot;
    if (bot === null) {
      return <div className="trading-card-horizontal">
        <LoadingAnimation/>
      </div>;
    }

    this.updateBotData(this.getBotId());

    let mmr_history = [];
    if(this.state.mmr_history)
      mmr_history = this.state.mmr_history.map(entry => {
        let new_entry = {};
        new_entry.name = moment(entry.created_at).calendar();
        new_entry.MMR = entry.mmr;
        return new_entry;
      });

    const win_rate_terran = bot.win_rate_race.terran;
    const win_rate_protoss = bot.win_rate_race.protoss;
    const win_rate_zerg = bot.win_rate_race.zerg;
    // The server currently sends match data representing the total
    // for all seasons. As a work around, let's calculate it instead.
    const win_total = win_rate_terran.win_count + win_rate_protoss.win_count + win_rate_zerg.win_count;
    const match_toal = win_rate_terran.match_count + win_rate_protoss.match_count + win_rate_zerg.match_count;
    return <div className="trading-card-horizontal">
      <div className="trading-card-header">
        <h2>{`Bot Name: ${bot.name}`}</h2>
        <h3>{`Current MMR: ${bot.current_mmr}`}</h3>
        { bot.github && <p className="bot-text">{`Github: ${bot.github}`}</p> }
        { bot.license && <p className="bot-text">{`License: ${bot.license}`}</p> }
        { bot.summary && <p className="bot-text">{`Summary: ${bot.summary}`}</p> }
        { bot.description && <p className="bot-text">{`Description: ${bot.description}`}</p> }
        <Link to={`/authors/?author_id=${bot.owner_id}`}>
          {`Bot Author: ${bot.owner.username}`}
        </Link>
        { this.renderDownloadButton(bot) }
        <SeasonSelector/>
      </div>
      <WinRatePieChart
        label="vs all"
        victories={win_total}
        defeats={match_toal - win_total}/>
      <WinRatePieChart
        label="vs terran"
        victories={win_rate_terran.win_count}
        defeats={win_rate_terran.match_count - win_rate_terran.win_count}/>
      <WinRatePieChart
        label="vs protoss"
        victories={win_rate_protoss.win_count}
        defeats={win_rate_protoss.match_count - win_rate_protoss.win_count}/>
      <WinRatePieChart
        label="vs zerg"
        victories={win_rate_zerg.win_count}
        defeats={win_rate_zerg.match_count - win_rate_zerg.win_count}/>
      {SimpleLineChart(mmr_history, "MMR")}
      <FetchTable url={`${API_URL}/bot_versions/${this.getBotId()}/`}
        schema={[
          {
            columnLabel: "Version",
            field: "version"
          },
          {
            columnLabel: "Download",
            field: "executable",
            sortable: false,
            render: row => {
              if (row.executable)
                return <a href={row.executable} className="btn" download>Download</a>;
              else return <div>Replay missing</div>;
            }
          },
        ]}/>
    </div>;
  }
}
export default withRouter(BotProfile);
