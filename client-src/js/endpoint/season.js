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
          <TableCell header={"BotName"} fieldName={"BotName"}/>
          <TableCell header={"Author"} fieldName={"author"}/>
          <TableCell header={"Race"} fieldName={"race"}/>
          <TableCell header={"Matches"} fieldName={"matches"}/>
          <TableCell header={"Race"} fieldName={"race"}/>
          <TableCell header={"Wins"} fieldName={"wins"}/>
          <TableCell header={"Win Pct"} fieldName={"winpct"}/>
        </CustomReactTable>
      </div>
    );
  }
}
