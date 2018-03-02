import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './app.js'
import { ResultTable } from './../component/table.js'

export class Season extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season: { summary : [] } };
  }

  componentDidMount() {
    // Get all the seasons from the server.
    axios.get(API_URL + "/seasons")
    .then((response) => {
      console.log(response.data);

      this.setState({
        season: response.data
      });
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <ResultTable label={this.state.season.name}
                     table={this.state.season.summary}
                     table_name={
                       [
                         "BotName",
                         "Author",
                         "Race",
                         "Matches",
                         "Wins",
                         "Win Pct"
                       ]
                     }/>
      </div>
    );
  }
}
