import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { API_URL } from './app.js'

const logo_path = require("./../../img/sc2Ladder.gif");

function renderSeasonLink(id, name) {
  let link_path = "/season/?season-id=" + id.toString();
  return (
    <Link to={link_path} key={id}>{name}</Link>
  );
}

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { season : [{id:1,name:"current"}],
                   sidebarExpanded : false,
                   seasonExpanded : false }
  }

  // loadSeasons(ctx) { // ctx is shorthand for the context of the react component
  //   return new Promise (function (resolve, reject) {
  //     axios.post(API_URL + "/credentials/logout", {})
  //       .then(function (response) {
  //         resolve(response.data);
  //       })
  //       .catch(function (error) {
  //         reject(response.data);
  //       });
  //   });
  // }

  componentDidMount() {
    // Get all the seasons from the server.
    axios.get(API_URL + "/seasons")
    .then((response) => {
      console.log(response.data);

      this.setState({
        season: response.data
      });
    })
    .catch((error) => {
      console.log("ERROR");
      console.log(error);
    });
  }

  collapseSeasonToggle = () => {
    this.setState({
      seasonExpanded: !this.state.seasonExpanded
    });
  }

  collapseSidebarToggle = () => {
    this.setState({
      sidebarExpanded: !this.state.sidebarExpanded
    });
  }

  render() {
    return (
      <nav id="sidebar" aria-expanded={this.state.sidebarExpanded}>
        <div id="toggle"
             onClick={this.collapseSidebarToggle}
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
               onClick={this.collapseSeasonToggle}
               aria-expanded={this.state.seasonExpanded}
              >Ladder Seasons</Link>
            <ul id="homeSubmenu"
                className={this.state.seasonExpanded ? "" : "collapse"}>
              <li>
                {
                  this.state.season.map((s) => {
                    return renderSeasonLink(s.id, s.name);
                  })
                }
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
