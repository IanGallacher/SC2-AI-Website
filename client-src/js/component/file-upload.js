import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import { API_URL } from './../routing/app.js'

export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { };
    this.form_values = {};
  }

  componentDidMount() {
    // Make sure we have a form_value for each child object.
    if(this.props.children)
    this.props.children.forEach(child => {
      if(child.props.group)
        this.form_values[child.props.group] = [];
      else
        this.form_values[child.props.name] = "";
    })
  }

  onChange = (event) => {
    var group = event.target.getAttribute("group");
    console.log(event.target.id);
    if(group) {
      var obj = {[event.target.name]: Number(event.target.value)};
      this.form_values[group][event.target.getAttribute("id")] = obj;
    }
    else
      this.form_values[event.target.name] = event.target.value;
  }

  onFileChange = (event) => {
    this.form_values["file"] = event.target.files[0];
  }

  onSubmit = (event) => {
    event.preventDefault();
    if(!validate(oForm)) return;
    var uploadValues = this.form_values;
    this.fileUpload(this.form_values);
  }

  validate = (oForm) => {
      var arrInputs = oForm.getElementsByTagName("input");
      for (var i = 0; i < arrInputs.length; i++) {
          var oInput = arrInputs[i];
          if (oInput.type == "file") {
              var sFileName = oInput.value;
              if (sFileName.length > 0) {
                  var blnValid = false;
                  for (var j = 0; j < this.props.validFileExtensions.length; j++) {
                      var sCurExtension = _validFileExtensions[j];
                      if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                          blnValid = true;
                          break;
                      }
                  }

                  if (!blnValid) {
                      alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                      return false;
                  }
              }
          }
      }

      return true;
  }
  fileUpload = (data) => {
    // Configure upload.
    const url = API_URL + this.props.uploadPath;
    const formData = new FormData();
    Object.keys(this.form_values).forEach((key) => {
      var d = data[key];
      if(typeof(data[key]) === "object" && key != "file") {
        d = JSON.stringify(data[key])
      }
      formData.append(key, d);
    })

    const config = { headers: { 'content-type': 'multipart/form-data' } }
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
    const children = this.props.children;
    // We have to do this at render time to make sure we get the most up to date
    // state of all children.
    var childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { onChange: this.onChange })
    );
    return (
      <form className="flex-horizontal" onSubmit={this.onSubmit}>
        <input name="file"
               type="file"
               className="btn"
               onChange={this.onFileChange}/>
        { childrenWithProps }
        <input type="submit"
               value="Submit"
               className="btn"/>
      </form>
    )
  }
}
