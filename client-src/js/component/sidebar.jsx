import React from "react";
import { Link } from "react-router-dom";

const logo_path = require("./../../img/sc2Ladder.gif");

function renderSeasonLink(id, name) {
  let link_path = `/season/?season-id=${id}`;
  return <Link to={link_path} key={id}>{name}</Link>;
}

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      season : [{id:1,name:"current"}],
      sidebarExpanded : false,
      seasonExpanded : false
    };
  }

  collapseSeasonToggle = () => {
    this.setState({ seasonExpanded: !this.state.seasonExpanded });
  }

  collapseSidebarToggle = () => {
    this.setState({ sidebarExpanded: !this.state.sidebarExpanded });
  }

  render() {
    return (
      <nav id="sidebar"
        aria-expanded={this.state.sidebarExpanded}
        className="sidebar">
        <div className="sidebar-header">
          <Link to="/">
            <img className="Header-logo-img"
              src={logo_path}
              alt="Sc2Ladder" />
          </Link>
        </div>

        <ul className="sidebar-components">
          <li>
            <Link to="#"
              onClick={this.collapseSeasonToggle}
              aria-expanded={this.state.seasonExpanded}
            >Ladder Seasons</Link>
            <ul id="homeSubmenu"
              className={this.state.seasonExpanded ? "" : "collapse"}>
              <li>
                { this.state.season.map(s => renderSeasonLink(s.id, s.name)) }
              </li>
            </ul>
          </li>
          <li><Link to="/learning">Learning</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/helpful-resources">Helpful Resources</Link></li>
        </ul>
      </nav>
    );
  }
}
