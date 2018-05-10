import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { API_URL } from "./../routing/app.js";
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

    const data = [
      {name: "Victories", value: bot.win_count},
      {name: "Defeats", value: bot.match_count - bot.win_count}
    ];
    const lineData = [
      {name: "Page A", uv: 4000, pv: 2400, amt: 2400},
      {name: "Page B", uv: 3000, pv: 1398, amt: 2210},
      {name: "Page C", uv: 2000, pv: 9800, amt: 2290},
      {name: "Page D", uv: 2780, pv: 3908, amt: 2000},
      {name: "Page E", uv: 1890, pv: 4800, amt: 2181},
      {name: "Page F", uv: 2390, pv: 3800, amt: 2500},
      {name: "Page G", uv: 3490, pv: 4300, amt: 2100},
    ];
    return (
      <React.Fragment>
        <div className="trading-card-horizontal">
          <title>{`Bot Name: ${bot.name}`}</title>
          <Link to={`/authors/?author_id=${bot.owner_id}`}>
            {`Bot Author: ${bot.author}`}
          </Link>
          <br/>
          <VictoryChart data={data}/>
          {SimpleLineChart(lineData)}
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(BotProfile);
