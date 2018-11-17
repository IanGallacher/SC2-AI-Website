import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import UserPropType from "./../custom-proptypes/user.js";
import { withRouter } from "react-router";

import { ModalContext } from "./../context/modal-context.js";

import { API_URL } from "./../app.js";
import { EditableImage } from "./../component/image.jsx";
import BotUpload from "./../component/bot-upload.jsx";
import { TextInput } from "./../component/form.jsx";
import FormZone from "./../component/form-zone.jsx";
import UserTitle from "./../component/user-title.jsx";
import ProfileDetail from "./../component/profile/profile-detail.jsx";

import FetchTable from "./../table/table-fetch.jsx";
import TableCell from "./../table/table-cell.jsx";
import SchemaFactory from "./../table/schema-factory.jsx";

const default_avatar_path = require("./../../img/avatar.jpg");


function AuthorDetails(props) {
  if (props.editing) return <FormZone
    method="patch" uploadPath={props.edit_url}>
    <TextInput name="github"
      type="text"
      placeholder={props.profile.github ? props.profile.github : "My Personal Github"}
      className="input-text"/>
  </FormZone>;
  if (props.profile.github) return <div className="author-details">
    <div className="profile-details">
      {ProfileDetail("fa-github", "Github", props.profile.github, true)}
      {ProfileDetail("fa-patreon","Patreon Tier", props.profile.patreon_tier, false)}
    </div>
  </div>;
  return null;
}
AuthorDetails.propTypes = {
  editing: PropTypes.bool,
  edit_url: PropTypes.string,
  profile: UserPropType
};

function renderBotDetails(bot) {
  return <BotUpload bot={bot} method="patch"/>;
}

class AuthorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: {} };
  }

  static propTypes = {
    author_id: PropTypes.number,
    editing: PropTypes.bool,
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired,
    profile: UserPropType
  }

  getAuthorData(author_id) {
    if (author_id == "") return;

    axios.get(`${API_URL}/authors/${author_id}`)
      .then(response => this.setState({ profile: response.data }));
  }

  getAuthorId() {
    let author_id = this.props.author_id;
    const search = this.props.location.search;
    if(search != "") {
      const params = new URLSearchParams(search);
      author_id = params.get("author_id");
    }
    return author_id;
  }

  componentDidMount() {
    this.getAuthorData(this.getAuthorId());
  }

  UNSAFE_componentWillReceiveProps() {
    this.getAuthorData(this.getAuthorId());
  }

  renderRoleIfNecessary = (role) => {
    if(role != "user")
      return <div className="trading-card-subtitle">{ `${role}` }</div>;
    return null;
  }

  render() {
    return (
      <ModalContext.Consumer>{modal => <div className="trading-card-horizontal">
        <UserTitle user={this.state.profile}/>
        <div className="flex-horizontal">
          <div className="trading-card-details-img-zone">
            <EditableImage
              img={this.state.profile.avatar}
              fallback={default_avatar_path}
              className="img-thumbnail"
              editing={this.props.editing}
              edit_url={`/users/${this.props.author_id}/create_avatar`}/>
            <AuthorDetails
              editing={this.props.editing}
              profile={this.state.profile}
              edit_url={`/users/${this.props.author_id}`}/>
          </div>
          <div className="flex-fill-remaining-space">
            {
              (this.state.profile.username) ? (
                <FetchTable url={`${API_URL}/users/${this.state.profile.id}/bots`}>
                  <TableCell {...SchemaFactory.BotNameSchema(this)}/>
                  <TableCell {...SchemaFactory.BotRaceSchema(this)}/>
                  <TableCell {...SchemaFactory.WinRateSchema(this)}/>
                  <TableCell {...SchemaFactory.MMRSchema(this)}/>
                  <TableCell header={"Edit"}
                    showColumnIf={() => this.props.editing}
                    sortable={false}
                    onClick={row => modal.showModal(renderBotDetails(row))}
                    render={() => <div className="fa fa-edit"/>}
                  />
                </FetchTable>
              ) : (
                <div/>
              )
            }
          </div>
          {
          /*
          <div className="grid-one-quarter">
              <ul className="list-group">
                <li className="list-group-item text-muted">Profile: </li>
                <li className="list-group-item text-right">
                  <span className="pull-left">
                    Joined:
                  </span>{this.state.profile.joindate}</li>
                <li className="list-group-item text-right">
                  <span className="pull-left">
                    Real name:
                  </span>{this.state.profile.name}</li>
              </ul>
            </div>
            */
          }
        </div>
      </div>}
      </ModalContext.Consumer>
    );
  }
}
export default withRouter(AuthorProfile);
