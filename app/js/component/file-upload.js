import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import { API_URL } from './../routing/app.js'

export default class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null, bot_name: null, bot_race: "terran" };
    if(localStorage.getItem("access_token") === null)
       localStorage.setItem("access_token", "");
  }

  onTextChange = (event) => {
    this.setState({
      bot_name: event.target.value
    });
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onRadioButtonChange = (event) => {
    this.setState({
      bot_race: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.fileUpload(this.state.file, this.state.bot_name, this.state.bot_race);
  }

  fileUpload = (file, bot_name, bot_race) => {
    // Configure upload.
    const url = API_URL + "/bots/upload";//"/user-uploads/botdll/upload";
    const access_token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', localStorage.getItem("user_id"));
    formData.append('bot_name', bot_name);
    formData.append('bot_race', bot_race);
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
        <input name="filename" type="text" onChange={this.onTextChange}/>
        <input name="file" type="file" onChange={this.onFileChange}/>
        <input type="radio" name="bot_race" value="terran" onChange={this.onRadioButtonChange} defaultChecked={true} /> Terran
        <input type="radio" name="bot_race" value="protoss" onChange={this.onRadioButtonChange}/> Protoss
        <input type="radio" name="bot_race" value="zerg" onChange={this.onRadioButtonChange}/> Zerg
        <input type="radio" name="bot_race" value="random" onChange={this.onRadioButtonChange}/> Random
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
