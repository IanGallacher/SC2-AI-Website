import axios from "axios";
import React from "react";

import AlertLogic from "./../logic/alert.js";
import { API_URL } from "./../app.js";
import FileUpload from "./../component/file-upload.jsx";
import { TextInput, Dropdown } from "./../component/form.jsx";

export default class AdminControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bots: [] };
  }

  componentDidMount() {
    const axios_url = `${API_URL}/bots`;
    axios.get(axios_url).then(response => this.setState({bots: response.data}));
  }

  onChange = (event) => {
    this.setState({ file: event.target.files[0] });
  }

  addSeasonBtn = () => {
    // Configure upload.
    const axios_url = `${API_URL}/seasons`;

    axios.post(axios_url, { "name": "Season", "summary": [{}] })
      .then(() => AlertLogic.addMessage("Season Created!", "alert-success"));
  }

  render() {
    var that = this;
    return <React.Fragment>
      <button onClick={this.addSeasonBtn}>Add Season</button>
      <FileUpload label="Upload GameResult:"
        uploadPath={"/game_results"}
        validFileExtensions={[".png"]}>
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
    </React.Fragment>;
  }
}
