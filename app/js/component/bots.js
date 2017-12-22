import React from 'react'
import { render } from 'react-dom'

export class Bots extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bots: [] };
  }

  componentDidMount() {
    let request = new XMLHttpRequest();

    request.onload = function(e) {
      if (request.readyState === 4) {
        console.log(request.response); //Outputs a DOMString by default

        this.setState({
          bots: JSON.parse(request.response)
        });
      }
    }.bind(this);
    request.open("get", API_URL + "/bots", true);
    request.send();
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
