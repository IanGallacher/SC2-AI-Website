import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";

import AlertLogic from "./../logic/alert.js";
import { API_URL } from "./../app.js";
import FileUpload from "./../component/file-upload.jsx";
import { TextInput, Dropdown } from "./../component/form.jsx";
import { confirmDestructiveAction } from "./../component/confirm-destructive-action.jsx";

import CustomReactTable from "./../table/table.jsx";
import TableCell from "./../table/table-cell.jsx";
import SchemaFactory from "./../table/schema-factory.jsx";

import { ModalContext } from "./../context/modal-context.js";

class ManualGameUpload extends React.PureComponent {
  static propTypes = {
    bots: PropTypes.object
  }

  render() {
    return <div>
      <div>Manual result upload:</div>
      <FileUpload label="Upload GameResult:"
        ajaxFileKey="replayfile"
        uploadPath={"/game_results"}
        validFileExtensions={[".png"]}>
        <TextInput name="map" type="text" placeholder="Map Name"/>
        <TextInput name="winner_name" type="text" placeholder="Winner Name"/>
        <Dropdown name="bot_id" options={this.props.bots} id="0" group="gba"/>
        <Dropdown name="bot_id" options={this.props.bots} id="1" group="gba"/>
      </FileUpload>
    </div>;
  }
}

class EditAllBots extends React.PureComponent {
  static propTypes = {
    bots: PropTypes.object,
    history: ReactRouterPropTypes.history
  }

  render() {
    // If we have recieved data, filter and sort the data.
    let bot_table = this.props.bots;
    return <ModalContext.Consumer>{modalContext =>
      <CustomReactTable table={bot_table} nullMessage="No bots found for user">
        <TableCell
          header={"Bot name"}
          field={"name"}
          sortValue={row => (row.name || "").toLowerCase()}
        />
        <TableCell {...SchemaFactory.BotAuthorSchema(this)}/>
        <TableCell {...SchemaFactory.BotRaceSchema(this)}/>
        <TableCell header={"Games Played"} field={"match_count"}/>
        <TableCell
          header={"delete?"}
          onClick={row => {
            modalContext.showModal(
              confirmDestructiveAction(
                function() {
                  const axios_url = `${API_URL}/bots/${row.id}`;
                  axios.delete(axios_url).then(
                    () => AlertLogic.addSuccess("Succesfully deleted bot")
                  ).catch(
                    () => AlertLogic.addError("Something went wrong")
                  );
                }
              )
            );
          }}
          render={() => <div className="fa fa-trash"/>}
        />
      </CustomReactTable>
    }</ModalContext.Consumer>;
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
