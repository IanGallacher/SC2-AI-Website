import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

import AlertLogic from "./../logic/alert.js";
import { API_URL } from "./../app.js";

export default class FormZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    this.form_values = {};
  }

  static propTypes = {
    children: PropTypes.array,
    uploadPath: PropTypes.string,
    method: PropTypes.string.isRequired
  }

  componentDidMount() {
    // Make sure we have a form_value for each child object.
    if(this.props.children) React.Children.forEach(child => {
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
    else { this.form_values[event.target.name] = this.getEventValue(event); }
  }

  getEventValue = event => {
    if (event.target.files) return event.target.files[0];
    else return event.target.value;
  }

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
    axios[this.props.method](url, formData, config)
      .then(() => AlertLogic.addSuccess("Upload successful!"))
      .catch(error => this.setState({errors: error.response.data}));
  }

  render() {
    const children = this.props.children;
    // We have to do this at render time to make sure we get the most up to date
    // state of all children.
    var childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        onChange: this.onChange, error: this.state.errors[child.name]
      })
    );
    return <form onSubmit={this.onSubmit} className="flex-vertical">
      { childrenWithProps }
      <input type="submit" value="Submit" className="btn"/>
    </form>;
  }
}
