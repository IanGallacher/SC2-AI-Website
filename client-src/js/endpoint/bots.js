import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import ResultTable from "./../component/table.jsx";

class Bots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired
  }

  componentDidMount() {
    let axios_url = `${API_URL}/bots`;
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

    // Filter based on search params.
    if(this.state.bots) bot_table = this.state.bots.filter(entry => {
      for(let pair of params.entries()) {
        if (entry[pair[0]] && entry[pair[0]] !== pair[1]) return false;
      }
      return true;
    });
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
          },
          {
            headerName:"MMR",
            fieldName:"current_mmr",
            displayType:"text"
          }
        ]
      }
    />;
  }
}
export default withRouter(Bots);
