import React from 'react'
import { render } from 'react-dom'
import { API_URL } from './app.js'
import UploadFile from './file-upload.js'

import { AuthorProfile } from './authors.js'

export class ProfileSettings extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AuthorProfile author_id={localStorage.getItem("user_id")}/>
        <UploadFile label="Upload Bot:" />
      </React.Fragment>
    );
  }
}
