import axios from "axios";
import React from "react";

import { API_URL } from "./../app.js";
import CustomReactTable from "./../table/table.jsx";
import TableCell from "./../table/table-cell.jsx";

export default class Season extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season: { summary : [] } };
  }

  componentDidMount() {
    // Get all the seasons from the server.
    axios.get(`${API_URL}/seasons`)
      .then(response => this.setState({ season: response.data }));
  }

  render() {
    return (
      <div>
        <CustomReactTable
          label={this.state.season.name}
          table={this.state.season.summary}>
          <TableCell header={"BotName"} field={"BotName"}/>
          <TableCell header={"Author"} field={"author"}/>
          <TableCell header={"Race"} field={"race"}/>
          <TableCell header={"Matches"} field={"matches"}/>
          <TableCell header={"Race"} field={"race"}/>
          <TableCell header={"Wins"} field={"wins"}/>
          <TableCell header={"Win Pct"} field={"winpct"}/>
        </CustomReactTable>
      </div>
    );
  }
}
