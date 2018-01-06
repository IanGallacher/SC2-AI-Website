import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './app.js'
import { ResultTable } from './table.js'

export class Bots extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bots: [] };
  }

  componentDidMount() {
    axios.get(API_URL + "/bots")
    .then((response) => {
      console.log(response.data);

      this.setState({
        bots: response.data
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
        <ResultTable label="Bots"
                     table={this.state.bots}
                     table_name={
                        [
                          "BotName",
                          "Author",
                          "Race"
                        ]
                      }/>
      </div>
    );
  }
}
