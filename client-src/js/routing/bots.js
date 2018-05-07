import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";
import {
  PieChart,
  Pie
} from "recharts";

import { API_URL } from "./../routing/app.js";
import ResultTable from "./../component/table.jsx";

class Bots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired,
    author_id: PropTypes.number
  }

  componentDidMount() {
    let axios_url = `${API_URL}/bots`;
    if (this.props.author_id)
      axios_url = `${API_URL}/users/${this.props.author_id}/bots`;
    axios.get(axios_url)
      .then(response => this.setState({ bots: response.data }));
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
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    let bot_table = null;
    if(this.state.bots) bot_table = this.state.bots.filter(entry => {
      for(let pair of params.entries()) {
        if (entry[pair[0]] && entry[pair[0]] !== pair[1]) return false;
      }
      return true;
    });
    let data = [];
    if(bot_table) data = [
      {name: "Victories", value: bot_table[2].win_count},
      {name: "Defeats", value: bot_table[2].match_count - bot_table[2].win_count}
    ];
    return (
      <React.Fragment>{this.renderBotTable(bot_table)}
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label={this.renderLabel}
            isAnimationActive={false}
          />
        </PieChart>
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
              this.props.history.push(`/bots/?name=${row.name}`);
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
export default withRouter(Bots);
