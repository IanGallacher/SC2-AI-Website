import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

import AlertLogic from "./../logic/alert.js";
import { API_URL } from "./../routing/app.js";

export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.form_values = {};
  }

  static propTypes = {
    children: PropTypes.element,
    uploadPath: PropTypes.string
  }

  componentDidMount() {
    // Make sure we have a form_value for each child object.
    if(this.props.children)
      this.props.children.forEach(child => {
        if(child.props.group)
          this.form_values[child.props.group] = [];
        else
          this.form_values[child.props.name] = "";
      });
  }

  onChange = event => {
    var group = event.target.getAttribute("group");
    if(group) {
      var obj = {[event.target.name]: Number(event.target.value)};
      this.form_values[group][event.target.getAttribute("id")] = obj;
    }
    else
      this.form_values[event.target.name] = event.target.value;
  }

  onFileChange = event => { this.form_values["file"] = event.target.files[0]; }

  onSubmit = event => {
    event.preventDefault();
    this.fileUpload(this.form_values);
  }

  fileUpload = data => {
    // Configure upload.
    const url = API_URL + this.props.uploadPath;
    const formData = new FormData();
    Object.keys(this.form_values).forEach((key) => {
      var d = data[key];
      if(typeof(data[key]) === "object" && key != "file") {
        d = JSON.stringify(data[key]);
      }
      formData.append(key, d);
    });
    const config = { headers: { "content-type": "multipart/form-data" } };
    // Submit the upload
    axios.post(url, formData, config)
      .then(() => AlertLogic.addMessage("Upload successful!", "alert-success"))
      .catch(error => console.log(error));
  }

  render() {
    const children = this.props.children;
    // We have to do this at render time to make sure we get the most up to date
    // state of all children.
    var childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onChange: this.onChange })
    );
    return <form className="flex-horizontal" onSubmit={this.onSubmit}>
      <input name="file"
        type="file"
        className="btn"
        onChange={this.onFileChange}/>
      { childrenWithProps }
      <input type="submit"
        value="Submit"
        className="btn"/>
    </form>;
  }
}
