import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

import { API_URL } from './app.js'
import FileUpload from './../component/file-upload.js'
import { TextInput, Dropdown, DropdownOption } from './../component/form.js'

export default class AdminControlPanel extends React.Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem("access_token") === null)
       localStorage.setItem("access_token", "");

    this.state = { bots: [] };
  }

  componentDidMount() {
    const axios_url = API_URL + "/bots";
    axios.get(axios_url)
    .then((response) => {
      this.setState({
        bots: response.data
      });
      console.log(response.data);
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
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

      axios.post(url, {
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
    var that = this;
    return (
      <React.Fragment>
        <button onClick={this.addSeasonBtn}>Add Season</button>
        <FileUpload label="Upload GameResult:" uploadPath={"/game_results"}>
          <TextInput name="map"
             type="text"
             placeholder="Map Name"/>
          <TextInput name="winner_name"
            type="text"
            placeholder="Winner Name"/>
          <Dropdown name="bot_id" options={that.state.bots}
                    id="0"
                    group="gba"/>
          <Dropdown name="bot_id" options={that.state.bots}
                    id="1"
                    group="gba"/>
        </FileUpload>
      </React.Fragment>
    )
  }
}
