import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import { API_URL } from './app.js'

export class AdminControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    if(localStorage.getItem("access_token") === null)
       localStorage.setItem("access_token", "");

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onChange(event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.fileUpload(this.state.file);
  }

  addSeasonBtn() {
    console.log("NEW SEASON");
  }

  fileUpload(file) {
    // Configure upload.
    const url = API_URL + "/bots/upload";//"/user-uploads/botdll/upload";
    const access_token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bot_name', "asdf");
    formData.append('user_id', localStorage.getItem("user_id"));
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': access_token
      }
    }
    console.log(formData);

    // Submit the upload
    axios.post(url, formData, config)
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
