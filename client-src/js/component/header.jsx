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
const Separator = () => <li className="navbar-divider">|</li>;

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season : [{ id:1, name:"current" }], navbarExpanded : false };
  }

  static propTypes = {
    role: PropTypes.string,
    username: PropTypes.string
  }

  logout = () => {
    LoginLogic.logout();
    AlertLogic.addSuccess("Logout successful");
  }

  expandHeader = () => {
    this.setState({navbarExpanded: true});
  }

  collapseHeader = () => {
    this.setState({navbarExpanded: false});
  }

  toggleHeader = () => {
    let newState = !this.state.navbarExpanded;
    this.setState({navbarExpanded: newState});
  }

  HeaderLink = ({link, text}) => <li className="navbar-btn">
    <NavLink to={link} onClick={this.toggleHeader}>{text}</NavLink>
  </li>;

  render() {
    let headerClass = "navbar";
    headerClass += (this.state.navbarExpanded) ? " expanded" : " collapsed";
    let toggleClass = "toggle-bar";
    toggleClass += (this.state.navbarExpanded) ? " expanded" : " collapsed";

    return (
      <nav className="header">
        <div
          className="toggle-wrap"
          data-expanded={this.state.navbarExpanded}
          onClick={this.toggleHeader}>
          <div className={toggleClass}/>
        </div>
        <Link to="/">
          <img className="header-img" src={logo_path} alt="Sc2Ladder"/>
        </Link>
        <div className="navbar-header">Starcraft 2 AI Ladder</div>
        <ul className={headerClass}>
          <this.HeaderLink link="/bots" text="Ladder"/>
          <this.HeaderLink link="/results" text="Results"/>
          <this.HeaderLink link="/authors" text="Authors"/>
          <this.HeaderLink link="/twitch" text="Twitch"/>
          <li className="navbar-btn">
            <a href="http://wiki.sc2ai.net">Wiki</a>
          </li>
          <this.HeaderLink link="/faq" text="FAQ"/>
          <RenderIfLoggedOut>
            <Separator/>
            <this.HeaderLink link="/sign-up" text="Sign Up"/>
            <this.HeaderLink link="/login" text="Login"/>
          </RenderIfLoggedOut>
          <RenderIfLoggedIn>
            <Separator/>
            <RenderIfRole role="admin">
              <this.HeaderLink link="/admin-control-panel" text="Admin"/>
            </RenderIfRole>
            <this.HeaderLink link="/my-profile" text="Profile"/>
            <li className="navbar-btn" onClick={this.logout}><a>Logout</a></li>
          </RenderIfLoggedIn>
        </ul>
      </nav>
    );
  }
}
