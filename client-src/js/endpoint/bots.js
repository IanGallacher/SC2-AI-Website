import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import {
  SeasonSelector,
  getSeasonFromUrl } from "./../context/season-context.js";
import FilterBar from "./../component/filter.jsx";
import ResultTable from "./../component/table.jsx";

class Bots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {old_season: 1};
  }

  static propTypes = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired
  }

  componentDidMount = () => {
    this.updateBotData(this.getSeasonId());
  }

  getSeasonId = () => { return getSeasonFromUrl(this.props.location.search); }

  updateBotData = (season_id) => {
    let axios_url = `${API_URL}/seasons/${season_id}`;
    axios.get(axios_url).then(response => {
      this.setState({ bots: response.data, old_season: season_id });
    });
  }

  render() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    let bot_table = null;

    let new_season_id = this.getSeasonId();
    if(this.state.old_season != new_season_id) this.updateBotData(new_season_id);

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
          if(row1.mmr < row2.mmr)
            return 1;
          else return -1;
        }
      );
    }
    return <React.Fragment>
      <FilterBar>
        <SeasonSelector filterIgnore="season"/>
      </FilterBar>
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
                this.props.history.push(`/authors/?author_id=${row.author_id}`);
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
              fieldName:"mmr"
            }
          ]
        }
      />
    </React.Fragment>;
  }
}
export default withRouter(Bots);
