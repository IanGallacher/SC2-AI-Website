import React from 'react'
import { render } from 'react-dom'
import { API_URL } from './app.js'
import BotUpload from './../component/bot-upload.js'
import FileUpload from './../component/file-upload.js'

import { AuthorProfile } from './../component/profile.js'

export default class ProfileSettings extends React.Component {
  render() {
    let avatarPath = "/users/" + this.props.author_id + "/create_avatar"
    return (
      <React.Fragment>
        <AuthorProfile author_id={this.props.author_id}/>
        <FileUpload label="Upload Avatar:" uploadPath={avatarPath}/>
        <BotUpload label="Upload Bot:" uploadPath="/bots/create"/>
      </React.Fragment>
    );
  }
}
