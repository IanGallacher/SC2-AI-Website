import React from "react";

import { UserContext } from "./../context/user-context.js";
import BotUpload from "./../component/bot-upload.jsx";
import { Slider } from "./../component/form.jsx";
import AuthorProfile from "./author-profile.js";

export default class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    return <UserContext.Consumer>{ user_data => (!user_data.id)
      ? null : <React.Fragment>
        <Slider
          label="edit"
          onChange={this.toggleEdit}
          toggled={this.state.editing}
        />
        <AuthorProfile author_id={user_data.id} editing={this.state.editing}/>
        <BotUpload label="Upload Bot:" uploadPath="/bots/create"/>
      </React.Fragment>
    }</UserContext.Consumer>;
  }
}
