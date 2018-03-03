import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './../routing/app.js'
import { ResultTable } from './table.js'

export class Bots extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bots: [] };
  }

  componentDidMount() {
    let axios_param = {};  console.log(this.props);
    // If we want to filter by author.
    if (this.props.author)
      axios_param = {
                      params: {
                        filter: {
                          "where": {
                            "author": this.props.author.username
                          }
                        }
                      }
                    };
    axios.get(API_URL + "/bots", axios_param)
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
