import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import { API_URL } from "./../app.js";
import {
  SeasonSelector,
  getSeasonFromUrl } from "./../context/season-context.js";
import FilterBar from "./../component/filter.jsx";

import CustomReactTable from "./../table/table.jsx";
import TableCell from "./../table/table-cell.jsx";

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
      bot_table = bot_table.sort((row1, row2) => row1.mmr < row2.mmr ? 1 : -1);
    }
    return <React.Fragment>
      <FilterBar>
        <SeasonSelector filterIgnore="season"/>
      </FilterBar>
      <CustomReactTable table={bot_table} nullMessage="No bots found for user">
        <TableCell
          header={"Bot name"}
          fieldName={"name"}
          sortValue={row => (row.name || "").toLowerCase()}
          onClick={row => this.props.history.push(`/bot/?bot_id=${row.bot_id}`)}
        />
        <TableCell
          header={"Author"}
          fieldName={"author"}
          sortValue={row => (row.name || "").toLowerCase()}
          onClick={row => this.props.history.push(`/authors/?author_id=${row.author_id}`)}
          optional={true}
        />
        <TableCell
          header={"Race"}
          fieldName={"race"}
          onClick={row => this.props.history.push(`/bots/?race=${row.race}`)}
          optional={true}
        />
        <TableCell header={"Games Won"} fieldName={"win_count"}/>
        <TableCell header={"Games Played"} fieldName={"match_count"}/>
        <TableCell header={"MMR"} fieldName={"mmr"}/>
      </CustomReactTable>
    </React.Fragment>;
  }
}
export default withRouter(Bots);
