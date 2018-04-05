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

export var API_URL = "/api"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { alert_messages: [],
                   user_data: { username: "", user_id: "" }
    }

    LoginLogic.getUserData().then((response) => {
      if (response.data)
      {
     this.setState({ "user_data": {
                     "username": response.data.username,
                     "user_id": response.data.id,
                     "role": response.data.role
                  }
               });
      }
    });

// Register callback that will render new notifications.
    AlertLogic.notify = (messages) => {
                          this.setState({
                            alert_messages: messages
                          });
                        }

    LoginLogic.notify = (user_data) => {
                          this.setState({
                            user_data: user_data
                          });
                        }
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <Header username={this.state.user_data.username}
                  role={this.state.user_data.role}
                  logout={this.logout}/>
          <div className="after-navbar">
            <div className="flex-horizontal">
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
