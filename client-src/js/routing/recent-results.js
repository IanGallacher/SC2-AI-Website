import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './app.js'
import { ResultTable } from './../component/table.js'

export default class RecentResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    axios.get(API_URL + "/game_results")
    .then((response) => {
      console.log(response.data);

      this.setState({
        game_results: response.data
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
        <ResultTable table={this.state.game_results}
                     schema={
                        [
                          {
                            headerName:"BotName",
                            fieldName:"BotName",
                            displayType:"text"
                          },
                          {
                            headerName:"Map",
                            fieldName:"map",
                            displayType:"text"
                          },
                          {
                            headerName:"Winner",
                            fieldName:"winner",
                            displayType:"text"
                          },
                          {
                            headerName:"Replay",
                            fieldName:"replay",
                            displayType:"link"
                          },
                        ]
                     }/>
      </div>
    );
  }
}
