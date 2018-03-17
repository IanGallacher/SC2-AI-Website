//import 'normalize.css'; // Standardize the dom elements before continuing.
import './../../css/style.scss'
//require('bootstrap-sass/assets/stylesheets/_bootstrap.scss')

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router,
         Route, Link, Prompt, Switch, Redirect } from 'react-router-dom'

import PageRouting from './page-routing.js'
import AlertLogic from './../logic/alert.js'
import LoginLogic from './../logic/login.js'

import { AlertZone } from './../component/alert.js'
import { Header } from './../component/header.js'
import { Sidebar } from './../component/sidebar.js'

export var API_URL = "http://localhost:3000"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { access_token: LoginLogic.getAccessToken,
                   alert_messages: []}

// Register callback that will render new notifications.
    AlertLogic.notify = (messages) => {
                          this.setState({
                            alert_messages: messages
                          });
                        }
  }

// I am using a new experimental feature of ECMAscript.
// At the time I am writing this, the proposal is currently in stage 2.
// Instead of writing "this.login = this.login.bind(this);" in the constructor,
// you are able to use arrow notation instead for binding methods.
// This eliminates tons of boilerplate code instide the constructor.
  login = (ctx) => {
    LoginLogic.login(ctx).then((user_data) => {
      localStorage.setItem("access_token", user_data.id);
      localStorage.setItem("user_id", user_data.userId);
      this.setState({ access_token: LoginLogic.getAccessToken() });
      AlertLogic.addMessage("Login successful", "alert-success");
    });
  }

  logout = (ctx) => {
    LoginLogic.logout(ctx).then((response) => {
      localStorage.setItem("access_token", "");
      localStorage.setItem("user_id", "");
      this.setState({ access_token: LoginLogic.getAccessToken() });
      AlertLogic.addMessage("Logout successful", "alert-success");
    });
  }

  signUp = (ctx) => {
    LoginLogic.signUp(ctx).then(function(response) {
      console.log(response)
      AlertLogic.addMessage("Account created", "alert-success");
    });
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header access_token={this.state.access_token}
                  logout={this.logout}/>
          <div className="after-navbar">
            <div className="flex-horizontal-container ">
              <Sidebar/>
              <div className="sidebar-placeholder"/>
              <div className="page-zone">
                <AlertZone messages={this.state.alert_messages}/>
                <div className="page-area">
                  <PageRouting ctx={this}/>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </Router>
    )
  }
}

render(<App/>, document.getElementById('app'));
