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
import SchemaFactory from "./../table/schema-factory.jsx";

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

  getBotTable = (params) => {
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
      bot_table = bot_table.sort((row1, row2) => row1.mmr < row2.mmr ? 1 : -1);
    }
    return bot_table;
  }

  render() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);

    let new_season_id = this.getSeasonId();
    if(this.state.old_season != new_season_id) this.updateBotData(new_season_id);

    const bot_table = this.getBotTable(params);

    return <React.Fragment>
      <FilterBar>
        <SeasonSelector filterIgnore="season"/>
      </FilterBar>
      <CustomReactTable table={bot_table} nullMessage="No bots found for user">
        <TableCell {...SchemaFactory.BotNameSchema(this)}/>
        <TableCell {...SchemaFactory.BotAuthorSchema(this)}/>
        <TableCell {...SchemaFactory.BotRaceSchema(this)}/>
        <TableCell {...SchemaFactory.GamesWonSchema(this)}/>
        <TableCell {...SchemaFactory.GamesPlayedSchema(this)}/>
        <TableCell header={"MMR"} field={"mmr"}/>
      </CustomReactTable>
    </React.Fragment>;
  }
}
export default withRouter(Bots);
