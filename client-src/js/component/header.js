import React from 'react'
import { render } from 'react-dom'
import { NavLink } from 'react-router-dom'
import AlertLogic from './../logic/alert.js'
import LoginLogic from './../logic/login.js'

export class Header extends React.Component {
  render() {
    if(this.props.username == "") {
      var signupButton = <li><NavLink to="/sign-up">Sign Up</NavLink></li>;
      var loginButton = <li><NavLink to="/login">Login</NavLink></li>;
    } else {
      var profileButton = <li><NavLink to="/my-profile">Profile</NavLink></li>;
      var logoutButton = <li onClick={() => {
        LoginLogic.logout()
        AlertLogic.addMessage("Logout successful", "alert-success");
      }}>
          <a>Log Out</a>
      </li>;
    }

    if(this.props.role == "admin") {
        var adminButton = <li><NavLink to="/admin-control-panel">Admin</NavLink></li>;
    }

    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">Starcraft 2 AI Ladder</div>
            <ul className="nav navbar-nav">
              { adminButton }
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/bots">Bots</NavLink></li>
              { signupButton }
              { loginButton }
              { profileButton }
              { logoutButton }
            </ul>
        </div>
      </nav>
    )
  }
}
