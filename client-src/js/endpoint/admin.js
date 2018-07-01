import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

import AlertLogic from "./../logic/alert.js";
import { API_URL } from "./../app.js";
import FileUpload from "./../component/file-upload.jsx";
import { TextInput, Dropdown } from "./../component/form.jsx";
import ResultTable from "./../component/table.jsx";

class ManualGameUpload extends React.PureComponent {
  static propTypes = {
    bots: PropTypes.object
  }

  render() {
    return <div>
      <div>Manual result upload:</div>
      <FileUpload label="Upload GameResult:"
        uploadPath={"/game_results"}
        validFileExtensions={[".png"]}>
        <TextInput name="map"
          type="text"
          placeholder="Map Name"/>
        <TextInput name="winner_name"
          type="text"
          placeholder="Winner Name"/>
        <Dropdown name="bot_id" options={this.props.bots}
          id="0"
          group="gba"/>
        <Dropdown name="bot_id" options={this.props.bots}
          id="1"
          group="gba"/>
      </FileUpload>
    </div>;
  }
}

class EditAllBots extends React.PureComponent {
  static propTypes = {
    bots: PropTypes.object
  }

  render() {
    // If we have recieved data, filter and sort the data.
    let bot_table = this.props.bots;
    return <ResultTable table={bot_table} nullMessage="No bots found for user"
      schema={
        [
          {
            columnLabel:"Bot name",
            fieldName:"name"
          },
          {
            columnLabel:"Author",
            fieldName:"author"
          },
          {
            columnLabel:"Race",
            fieldName:"race"
          },
          {
            columnLabel:"Games Played",
            fieldName:"match_count"
          },
          {
            columnLabel:"delete?",
            onClick: row => {
              const axios_url = `${API_URL}/bots/${row.id}`;
              axios.delete(axios_url).then(
                () => AlertLogic.addMessage("Succesfully deleted bot", "alert-success")
              ).catch(
                () => AlertLogic.addError("Something went wrong")
              );
            },
            render: () => {
              return <div className="fa fa-trash"/>;
            }
          }
        ]
      }
    />;
  }
}

export default class AdminControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bots: [] };
  }

  componentDidMount() {
    const axios_url = `${API_URL}/bots`;
    axios.get(axios_url).then(response => this.setState({bots: response.data}));
  }

  onChange = (event) => {
    this.setState({ file: event.target.files[0] });
  }

  render() {
    return <React.Fragment>
      <ManualGameUpload bots={this.state.bots}/>
      <EditAllBots bots={this.state.bots} editable/>
    </React.Fragment>;
  }
}
