import axios from "axios";
import React from "react";

import { API_URL } from "./app.js";
import { ResultTable } from "./../component/table.jsx";

export default class Season extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season: { summary : [] } };
  }

  componentDidMount() {
    // Get all the seasons from the server.
    axios.get(`${API_URL}/seasons`)
      .then(response => this.setState({ season: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <ResultTable label={this.state.season.name}
          table={this.state.season.summary}
          schema={
            [
              {
                headerName:"BotName",
                fieldName:"BotName",
                displayType:"text"
              },
              {
                headerName:"Author",
                fieldName:"author",
                displayType:"text"
              },
              {
                headerName:"Race",
                fieldName:"race",
                displayType:"text"
              },
              {
                headerName:"Matches",
                fieldName:"matches",
                displayType:"text"
              },
              {
                headerName:"Wins",
                fieldName:"wins",
                displayType:"text"
              },
              {
                headerName:"Win Pct",
                fieldName:"winpct",
                displayType:"text"
              }
            ]
          }/>
      </div>
    );
  }
}
