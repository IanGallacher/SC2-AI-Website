import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

import AlertLogic from "./../logic/alert.js";
import { API_URL } from "./../routing/app.js";

export default class BotUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null, bot_name: null, bot_race: "Terran" };
  }

  static propTypes = { uploadPath: PropTypes.string }

  onChange = event => {
    let new_state = {};
    new_state[event.target.name] = event.target.value;
    this.setState(new_state);
  }

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onSubmit = () => {
    event.preventDefault();
    this.fileUpload(this.state.file, this.state.bot_name, this.state.bot_race);
  }

  fileUpload = (file, bot_name, bot_race) => {
    // Configure upload.
    const url = API_URL + this.props.uploadPath;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", bot_name);
    formData.append("race", bot_race);
    const config = { headers: { "content-type": "multipart/form-data" } };
    // Submit the upload
    axios.post(url, formData, config)
      .then(() => AlertLogic.addMessage("Upload successful!", "alert-success"));
  }

  render() {
    return (
      <form className="flex-horizontal"
        onSubmit={this.onSubmit}>
        <input name="bot_name"
          type="text"
          placeholder="Bot Name"
          className="text-input"
          onChange={this.onChange}/>
        <input name="file"
          type="file"
          className="btn"
          onChange={this.onFileChange}/>
        <select name="race"
          className="text-input"
          onChange={this.onChange}>
          <option value="Terran">Terran</option>
          <option value="Protoss">Protoss</option>
          <option value="Zerg">Zerg</option>
          <option value="Random">Random</option>
        </select>
        <input type="submit" value="Submit" className="btn"/>
      </form>
    );
  }
}
