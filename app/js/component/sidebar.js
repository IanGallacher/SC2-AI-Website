import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

const logo_path = require("./../../img/sc2Ladder.gif");

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sidebarExpanded : false,
                   seasonExpanded : false }
  }

  collapseSeasonToggle() {
    this.setState({
      seasonExpanded: !this.state.seasonExpanded
    });
  }

  collapseSidebarToggle() {
    this.setState({
      sidebarExpanded: !this.state.sidebarExpanded
    });
  }

  render() {
    return (
      <nav id="sidebar" aria-expanded={this.state.sidebarExpanded}>
        <div id="toggle"
             onClick={this.collapseSidebarToggle.bind(this)}
             data-expanded={this.state.sidebarExpanded}
             className="toggle-wrap">
            <span className="toggle-bar"></span>
        </div>
        <div className="sidebar-header">
          <Link to="/">
            <img className="Header-logo-img"
                 src={"/"+logo_path}
                 alt="Sc2Ladder" />
          </Link>
        </div>

        <ul className="sidebar-components">
          <li>
            <Link to="#"
               onClick={this.collapseSeasonToggle.bind(this)}
               aria-expanded={this.state.seasonExpanded}
              >Ladder Seasons</Link>
            <ul id="homeSubmenu"
                className={this.state.seasonExpanded ? "" : "collapse"}>
              <li>
                <Link to="/season/?season-id=">Current</Link>
              </li>
            </ul>
          </li>
          <li><Link to="/authors">Bot Authors</Link></li>
          <li><Link to="/learning">Learning</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/helpful-resources">Helpful Resources</Link></li>
        </ul>
      </nav>
    )
  }
}
