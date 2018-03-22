import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import { RadioButton, RadioButtonDefault } from './button.js'
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
    const url = API_URL + "/bots/create";//"/user-uploads/botdll/upload";
    const access_token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', bot_name);
    formData.append('race', bot_race);
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
        <RadioButtonDefault radioGroupName="bot_race"
                            id="Terran"
                            label="Terran"
                            value="terran"
                            onChange={this.onRadioButtonChange}/>
        <RadioButton radioGroupName="bot_race"
                     id="Protoss"
                     label="Protoss"
                     value="protoss"
                     onChange={this.onRadioButtonChange}/>
        <RadioButton radioGroupName="bot_race"
                     id="Zerg"
                     label="Zerg"
                     value="zerg"
                     onChange={this.onRadioButtonChange}/>
        <RadioButton radioGroupName="bot_race"
                     id="Random"
                     label="Random"
                     value="random"
                     onChange={this.onRadioButtonChange}/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}
