import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import FilterBar from "./../component/filter.jsx";
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

    // If we have recieved data, filter and sort the data.
    if(this.state.bots) {
      // Filter based on search params.
      bot_table = this.state.bots.filter(entry => {
        for(let pair of params.entries()) {
          if (entry[pair[0]] && entry[pair[0]] !== pair[1]) return false;
        }
        return true;
      });

      // Default sorting of the data is sorting by bot MMR.
      bot_table = bot_table.sort(
        (row1, row2) => {
          if(row1.current_mmr < row2.current_mmr)
            return 1;
          else return -1;
        }
      );
    }
    return <React.Fragment>
      <FilterBar/>
      <ResultTable table={bot_table} nullMessage="No bots found for user"
        schema={
          [
            {
              columnLabel:"Bot name",
              fieldName:"name",
              sortValue: row => (row.name || "").toLowerCase(),
              onClick: row => {
                this.props.history.push(`/bot/?bot_id=${row.id}`);
              }
            },
            {
              columnLabel:"Author",
              fieldName:"author",
              sortValue: row => (row.author || "").toLowerCase(),
              onClick: row => {
                this.props.history.push(`/authors/?author_id=${row.owner_id}`);
              },
              optional: true
            },
            {
              columnLabel:"Race",
              fieldName:"race",
              onClick: row => {
                this.props.history.push(`/bots/?race=${row.race}`);
              },
              optional: true
            },
            {
              columnLabel:"Games Won",
              fieldName:"win_count"
            },
            {
              columnLabel:"Games Played",
              fieldName:"match_count",
              optional: true
            },
            {
              columnLabel:"MMR",
              fieldName:"current_mmr"
            }
          ]
        }
      />
    </React.Fragment>;
  }
}
export default withRouter(Bots);
