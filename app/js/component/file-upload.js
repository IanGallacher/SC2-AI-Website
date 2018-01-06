import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import { API_URL } from './app.js'

export default class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    if(localStorage.getItem("access_token") === null)
       localStorage.setItem("access_token", "");
  }

  onChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.fileUpload(this.state.file);
  }

  fileUpload = (file) => {
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
      <form onSubmit={this.onSubmit}>
        <label htmlFor="file">{this.props.label}</label>
        <input name="file" type="file" onChange={this.onChange}/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
