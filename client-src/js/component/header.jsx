import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

import AlertLogic from "./../logic/alert.js";
import LoginLogic from "./../logic/login.js";
import {
  RenderIfRole,
  RenderIfLoggedIn,
  RenderIfLoggedOut
} from "./../logic/permission.js";

const logo_path = require("./../../img/Yc40O.png");
const Separator = () => <li>|</li>;

const HeaderLink = ({link, text}) => <li className="navbar-btn">
  <NavLink to={link}>{text}</NavLink>
</li>;
HeaderLink.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string
};
const UnessentialHeaderLink = ({link, text}) => <li className="navbar-btn unessential">
  <NavLink to={link}>{text}</NavLink>
</li>;
UnessentialHeaderLink.propTypes = {
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
        <Link to="/">
          <img className="header-img" src={logo_path} alt="Sc2Ladder"/>
        </Link>
        <div className="navbar-header">Starcraft 2 AI Ladder</div>
        <ul className="navbar">
          <HeaderLink link="/bots" text="Bots"/>
          <HeaderLink link="/results" text="Results"/>
          <HeaderLink link="/authors" text="Authors"/>
          <li className="navbar-btn unessential">
            <a href="http://wiki.sc2ai.net">Wiki</a>
          </li>
          <UnessentialHeaderLink link="/faq" text="FAQ"/>
          <RenderIfLoggedOut>
            <Separator/>
            <HeaderLink link="/sign-up" text="Sign Up"/>
            <HeaderLink link="/login" text="Login"/>
          </RenderIfLoggedOut>
          <RenderIfLoggedIn>
            <Separator/>
            <RenderIfRole role="admin">
              <HeaderLink link="/admin-control-panel" text="Admin"/>
            </RenderIfRole>
            <HeaderLink link="/my-profile" text="Profile"/>
            <li className="navbar-btn" onClick={this.logout}><a>Logout</a></li>
          </RenderIfLoggedIn>
        </ul>
      </nav>
    );
  }
}
