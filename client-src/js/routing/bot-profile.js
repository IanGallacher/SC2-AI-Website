import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";
import {
  PieChart,
  Pie,
  Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

import { API_URL } from "./../routing/app.js";
import LoadingAnimation from "./../component/loading.jsx";
import ResultTable from "./../component/table.jsx";



const SimpleLineChart = (data) => {
  return (
    <LineChart width={600} height={300} data={data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name"/>
      <YAxis/>
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip/>
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
};


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
    const COLORS = ["#00CC22", "#BB1100", "#FFBB28", "#FF8042"];
    return (
      <React.Fragment>
        <div className="trading-card-horizontal">
          <title>{`Bot Name: ${bot.name}`}</title>
          <Link to={`/authors/?author_id=${bot.owner_id}`}>
            {`Bot Author: ${bot.author}`}
          </Link>
          <br/>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              dataKey="value"
              cx={150}
              cy={150}
              outerRadius={80}
              isAnimationActive={false}>
              {
                data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
          </PieChart>
          {SimpleLineChart(lineData)}
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
