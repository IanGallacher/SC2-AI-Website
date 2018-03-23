import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './../routing/app.js'
import { ResultTable } from './table.js'

export class BotTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bots: [] };
  }

  componentDidMount() {
    console.log(this.props);
    if (!this.props.author_id)
      var axios_url = API_URL + "/bots";
    else
      var axios_url = API_URL + "/users/" + this.props.author_id + "/bots";
    axios.get(axios_url)
    .then((response) => {
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
    if (this.state.bots.length > 0)
      return (
        <div>
          <ResultTable
                       table={this.state.bots}
                       schema={
                          [
                            {
                              headerName:"Bot name",
                              fieldName:"name",
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
                            }
                          ]
                        }/>
        </div>
      );
    return (<div>No bots found for user</div>);
  }
}
