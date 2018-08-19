import axios from "axios";
import moment from "moment";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import LoadingAnimation from "./../component/loading.jsx";
import { SimpleLineChart } from "./../component/chart.jsx";
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
    this.getBotData(this.getBotId());
  }

  UNSAFE_componentWillReceiveProps() {
    this.getBotData(this.getBotId());
  }

  getBotData(bot_id) {
    axios.get(`${API_URL}/bots/${bot_id}`)
      .then(response => this.setState({ bot_id, bot_data: response.data }) );
    axios.get(`${API_URL}/bot_histories/${bot_id}`)
      .then(response => this.setState({ bot_history: response.data }));
  }

  getBotId() {
    let bot_id = -1;
    const search = this.props.location.search;
    if(search != "") {
      const params = new URLSearchParams(search);
      bot_id = params.get("bot_id");
    }
    return bot_id;
  }

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
    return <div className="trading-card-horizontal">
      <div className="trading-card-header">
        <h2>{`Bot Name: ${bot.name}`}</h2>
        <Link to={`/authors/?author_id=${bot.owner_id}`}>
          {`Bot Author: ${bot.author}`}
        </Link>
      </div>
      <WinRatePieChart
        label="vs all"
        victories={bot.win_count}
        defeats={bot.match_count - bot.win_count}/>
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
    </div>;
  }
}
export default withRouter(BotProfile);
