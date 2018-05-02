import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import AlertLogic from "./../logic/alert.js";
import LoginLogic from "./../logic/login.js";
import {
  RenderIfRole,
  RenderIfLoggedIn,
  RenderIfLoggedOut
} from "./../logic/permission.js";

const Separator = () => <li>|</li>;

const HeaderLink = ({link, text}) => <li className="navbar-btn">
  <NavLink to={link}>{text}</NavLink>
</li>;
HeaderLink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season : [{id:1,name:"current"}],
      sidebarExpanded : false,
      seasonExpanded : false };
  }

  static propTypes = {
    role: PropTypes.string,
    username: PropTypes.string
  }

  logout = () => {
    LoginLogic.logout();
    AlertLogic.addMessage("Logout successful", "alert-success");
  }

  render() {
    return (
      <nav className="header">
        <div className="navbar-header">Starcraft 2 AI Ladder</div>
        <ul className="navbar">
          <RenderIfRole role="admin">
            <HeaderLink link="/admin-control-panel" text="Admin"/>
          </RenderIfRole>
          <HeaderLink link="/home" text="Home"/>
          <HeaderLink link="/bots" text="Bots"/>
          <HeaderLink link="/authors" text="Authors"/>
          <RenderIfLoggedOut>
            <Separator/>
            <HeaderLink link="/sign-up" text="Sign Up"/>
            <HeaderLink link="/login" text="Login"/>
          </RenderIfLoggedOut>
          <RenderIfLoggedIn>
            <HeaderLink link="/my-profile" text="Profile"/>
            <Separator/>
            <li onClick={this.logout}><a>Logout</a></li>
          </RenderIfLoggedIn>
        </ul>
      </nav>
    );
  }
}
