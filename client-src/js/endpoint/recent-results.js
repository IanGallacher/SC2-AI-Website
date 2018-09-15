import axios from "axios";
import React from "react";
import ReactRouterPropTypes from "react-router-prop-types";

import { API_URL } from "./../app.js";
import {
  SeasonSelector,
  getSeasonFromUrl } from "./../context/season-context.js";
import FilterBar from "./../component/filter.jsx";

import CustomReactTable from "./../table/table.jsx";
import TableCell from "./../table/table-cell.jsx";
import TablePagination from "./../table/table-pagination.jsx";

export default class RecentResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      per_page: 30,
      game_results: [],
      total_results: null,
      old_season: null
    };
  }

  static propTypes = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired
  }

  componentDidMount = () => { this.updateResultData(this.getSeasonId()); }

  updateResultData = (season_id, page=null) => {
    // There is a bug with react that is causing the setState callback to not use the updated state.
    // The current workaround is to pass the variable direclty
    page = page || this.state.page;
    let axios_url = `${API_URL}/game_results?per_page=${this.state.per_page}`;
    axios_url += `&page=${page}`;
    axios_url += `&season_id=${season_id}`;
    axios.get(axios_url).then(response => this.setState({
      game_results: response.data.game_results,
      total_results: response.data.total,
      old_season: season_id
    }));
  }

  getSeasonId = () => { return getSeasonFromUrl(this.props.location.search); }

  getPage = page => {
    this.setState({ page },this.updateResultData(this.getSeasonId(), page));
  }

  initPageNumbers() {
    let total_rows = parseInt(this.state.total_results);
    let page = 1;
    let rows = [];
    for(let x = 0; x < total_rows; x += this.state.per_page) {
      rows.push(page);
      page++;
    }
    return rows;
  }

  render() {
    let new_season_id = this.getSeasonId();
    if(this.state.old_season != new_season_id)
      this.updateResultData(new_season_id);
    let rows = this.initPageNumbers();

    return (
      <div>
        <FilterBar>
          <SeasonSelector filterIgnore="season"/>
        </FilterBar>
        <CustomReactTable table={this.state.game_results}>
          <TableCell
            header={"First bot"}
            sortValue={row => (row.bots[0].name || "").toLowerCase()}
            render={row => {
              if(row.bots.length > 0 && row.bots.length >= 2)
                return row.bots[0].name;
            }}
          />
          <TableCell
            header={"Second bot"}
            sortValue={row => (row.bots[1].name || "").toLowerCase()}
            render={row => {
              if(row.bots.length > 0 && row.bots.length >= 2)
                return row.bots[1].name;
            }}
          />
          <TableCell
            header={"Map"}
            fieldName={"map"}
            sortValue={row => (row.map || "").toLowerCase()}
          />
          <TableCell
            header={"Winner"}
            fieldName={"winner_name"}
            sortValue={row => (row.winner_name || "").toLowerCase()}
            onClick={row => {
              this.props.history.push(`/bot/?bot_id=${row.winner_id}`);
            }}
          />
          <TableCell
            header={"Replay"}
            fieldName={"replay"}
            sortable={false}
            optional={true}
            render={row => {
              if (row.replay)
                return <form method="get" action={row.replay}>
                  <button className="btn">Download</button>
                </form>;
              else return <div>Replay missing</div>;
            }}
          />
        </CustomReactTable>
        <TablePagination rows={rows} getPage={this.getPage}/>
      </div>
    );
  }
}
