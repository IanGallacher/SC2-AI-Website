import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './app.js'

export default class AdminControlPanel extends React.Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem("access_token") === null)
       localStorage.setItem("access_token", "");
  }

  onChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  addSeasonBtn = () => {
    console.log("NEW SEASON");

      // Configure upload.
      const url = API_URL + "/seasons";
      const access_token = localStorage.getItem("access_token");

      let instance = axios.create({
        headers: {'Authorization': access_token}
      });

      instance.post(url, {
        "name": "Season",
        "summary": [
          {}
        ]
      })
      .then(function (response) {
        console.log("upload response");
        console.log(response);
      })
      .catch(function (error) {
        console.log("ERROR");
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.addSeasonBtn}>Add Season</button>
      </React.Fragment>
    )
  }
}
