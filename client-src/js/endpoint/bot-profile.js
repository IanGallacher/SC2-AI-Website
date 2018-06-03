import axios from "axios";
import moment from "moment";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import LoadingAnimation from "./../component/loading.jsx";
import { SimpleLineChart, VictoryChart } from "./../component/chart.jsx";
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

  componentWillReceiveProps() {
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
            headerName:"Bot name",
            fieldName:"name",
            displayType:"text",
            onClick: (row) => {
              this.props.history.push(`/bot/?bot_id=${row.id}`);
            }
          },
          {
            headerName:"Author",
            fieldName:"author",
            displayType:"text",
            onClick: (row) => {
              this.props.history.push(`/authors/?author_id=${row.owner_id}`);
            }
          },
          {
            headerName:"Race",
            fieldName:"race",
            displayType:"text",
            onClick: (row) => {
              this.props.history.push(`/bots/?race=${row.race}`);
            }
          },
          {
            headerName:"Games Won",
            fieldName:"win_count",
            displayType:"text"
          },
          {
            headerName:"Games Played",
            fieldName:"match_count",
            displayType:"text"
          }
        ]
      }
    />;
  }

  render() {
    let bot = this.state.bot;
    if (bot === null) return <div className="trading-card-horizontal">
      <LoadingAnimation/>
    </div>;

    const win_percentage = [
      {name: "Victories", value: bot.win_count},
      {name: "Defeats", value: bot.match_count - bot.win_count}
    ];

    let bot_history = [];
    if(this.state.bot_history)
      bot_history = this.state.bot_history.map(entry => {
        let new_entry = {};
        new_entry.name = moment(entry.created_at).calendar();
        new_entry.MMR = entry.mmr;
        return new_entry;
      });

    return <div className="trading-card-horizontal">
      <br/>
      <VictoryChart data={win_percentage}/>
      {SimpleLineChart(bot_history, "MMR")}
    </div>;
  }
}
export default withRouter(BotProfile);
