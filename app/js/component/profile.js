import React from 'react'
import { render } from 'react-dom'
import { API_URL } from './app.js'
import UploadFile from './file-upload.js'

export class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UploadFile label="Upload Bot:" />
    );
  }
}
