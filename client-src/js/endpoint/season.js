import axios from "axios";
import React from "react";

import { API_URL } from "./../app.js";
import ResultTable from "./../component/table.jsx";

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
        <ResultTable label={this.state.season.name}
          table={this.state.season.summary}
          schema={
            [
              {
                columnLabel:"BotName",
                fieldName:"BotName"
              },
              {
                columnLabel:"Author",
                fieldName:"author"
              },
              {
                columnLabel:"Race",
                fieldName:"race"
              },
              {
                columnLabel:"Matches",
                fieldName:"matches"
              },
              {
                columnLabel:"Wins",
                fieldName:"wins"
              },
              {
                columnLabel:"Win Pct",
                fieldName:"winpct"
              }
            ]
          }/>
      </div>
    );
  }
}
