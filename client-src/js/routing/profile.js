import React from 'react'
import { render } from 'react-dom'
import { API_URL } from './app.js'
import BotUpload from './../component/bot-upload.js'

import { Slider } from './../component/form.js'
import { AuthorProfile } from './../component/profile.js'
import { UserContext } from './../context/user-context.js'

export default class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    return <UserContext.Consumer>{ user_data => <React.Fragment>
        <Slider
          label="edit"
          onChange={this.toggleEdit}
          toggled={this.state.editing}
        />
        <AuthorProfile author_id={user_data.id} editing={this.state.editing}/>
        <BotUpload label="Upload Bot:" uploadPath="/bots/create"/>
      </React.Fragment>
    }</UserContext.Consumer>
  }
}
