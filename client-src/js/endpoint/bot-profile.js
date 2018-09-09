import axios from "axios";
import moment from "moment";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import {
  SeasonSelector,
  getSeasonFromUrl } from "./../context/season-context.js";
import LoadingAnimation from "./../component/loading.jsx";
import { SimpleLineChart } from "./../component/chart.jsx";
import FetchTable from "./../component/table-fetch.jsx";
import WinRatePieChart from "./../component/win-rate-pie-chart.jsx";
import ResultTable from "./../component/table.jsx";

class BotProfile extends React.Component {
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
    let season_id = this.getSeasonId();
    if(this.state.old_season == season_id) return null;
    axios.get(`${API_URL}/bots/${bot_id}?season_id=${season_id}`)
      .then(response => this.setState({ bot: response.data }) );
    axios.get(`${API_URL}/bot_histories/${bot_id}?season_id=${season_id}`)
      .then(response => this.setState({ bot_history: response.data }));
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

  getSeasonId = () => { return getSeasonFromUrl(this.props.location.search); }

  renderBotTable(bot_table) {
    return <ResultTable table={bot_table} nullMessage="No bots found for user"
      schema={
        [
          {
            columnLabel:"Bot name",
            fieldName:"name",
            onClick: row => {
              this.props.history.push(`/bot/?bot_id=${row.id}`);
            }
          },
          {
            columnLabel:"Author",
            fieldName:"author",
            onClick: row => {
              this.props.history.push(`/authors/?author_id=${row.owner_id}`);
            }
          },
          {
            columnLabel:"Race",
            fieldName:"race",
            onClick: row => {
              this.props.history.push(`/bots/?race=${row.race}`);
            }
          },
          {
            columnLabel:"Games Won",
            fieldName:"win_count"
          },
          {
            columnLabel:"Games Played",
            fieldName:"match_count"
          }
        ]
      }
    />;
  }

  render() {
    const bot = this.state.bot;
    if (bot === null) {
      return <div className="trading-card-horizontal">
        <LoadingAnimation/>
      </div>;
    }

    this.updateBotData(this.getBotId());

    let bot_history = [];
    if(this.state.bot_history)
      bot_history = this.state.bot_history.map(entry => {
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
        <Link to={`/authors/?author_id=${bot.owner_id}`}>
          {`Bot Author: ${bot.author}`}
        </Link>
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
      {SimpleLineChart(bot_history, "MMR")}
      <FetchTable url={`${API_URL}/bot_versions/${this.getBotId()}/`}
        schema={[
          {
            columnLabel:"Version",
            fieldName:"version"
          },
          {
            columnLabel:"Download",
            fieldName:"executable",
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
