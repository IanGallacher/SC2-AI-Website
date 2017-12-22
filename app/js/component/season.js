import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './app.js'
import { ResultTable } from './table.js'

export class Season extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season: { summary : [] } };
  }

  componentDidMount() {
    let request = new XMLHttpRequest();

    request.onload = function(e) {
      if (request.readyState === 4) {
        console.log(request.response); //Outputs a DOMString by default

        this.setState({
          season: JSON.parse(request.response)
        });
      }
    }.bind(this);

    request.open("get", API_URL + "/seasons", true);
    request.send();
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
