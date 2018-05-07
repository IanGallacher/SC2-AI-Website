import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";
import {
  PieChart,
  Pie
} from "recharts";

import { API_URL } from "./../routing/app.js";
import LoadingAnimation from "./../component/loading.jsx";
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

  componentDidMount() {
    let axios_url = `${API_URL}/bots/${this.getBotId()}`;
    axios.get(axios_url)
      .then(response => this.setState({ bot: response.data }));
    this.getBotData(this.getBotId());
  }

  componentWillReceiveProps() {
    this.getBotData(this.getBotId());
  }

  renderLabel = (args) => {
    let { cx, cy, name, midAngle, innerRadius, outerRadius, percent } = args;
    const radius = innerRadius + (outerRadius - innerRadius) + 20;
    const RADIAN = 3.14/180;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  }

  render() {
    let bot = this.state.bot;
    if (bot === null) return <div className="trading-card-horizontal">
      <LoadingAnimation/>
    </div>;

    let data = [
      {name: "Victories", value: bot.win_count},
      {name: "Defeats", value: bot.match_count - bot.win_count}
    ];
    return (
      <React.Fragment>
        <div className="trading-card-horizontal">
          <title>{`Bot Name: ${bot.name}`}</title>
          {`Bot Author: ${bot.author}`}
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              cx={200}
              cy={200}
              outerRadius={40}
              fill="#8884d8"
              label={this.renderLabel}
              isAnimationActive={false}
            />
          </PieChart>
        </div>
      </React.Fragment>
    );
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
}
export default withRouter(BotProfile);
