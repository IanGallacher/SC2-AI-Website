//import 'normalize.css'; // Standardize the dom elements before continuing.
import './../../css/style.scss'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router,
         Route, Link, Prompt, Switch, Redirect } from 'react-router-dom'

import PageRouting from './page-routing.js'
import AlertLogic from './../logic/alert.js'
import LoginLogic from './../logic/login.js'

import { UserContext } from './../context/user-context.js'
import { AlertZone } from './../component/alert.js'
import Header from './../component/header.js'
import Sidebar from './../component/sidebar.js'

export var API_URL = "/api"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert_messages: [],
      user_data: {
        username: "",
        id: "",
        role: "",
        calorie_goal: localStorage.getItem("calorie_goal"),
      }
    }

    LoginLogic.getUserData().then((response) => {
      if (response.data)
        this.setState({
          user_data: {
            username: response.data.email,
            id: response.data.id,
            role: response.data.role,
            calorie_goal: response.data.calorie_goal
          }
       });
    });

// Register callback that will render new notifications.
    AlertLogic.notify = (messages) => {
      this.setState({
        alert_messages: messages
      });
    }

    LoginLogic.notify = (user_data) => {
      console.log(user_data)
      this.setState({
        user_data: user_data
      });
    }
  }

  updateGoal = (goal) => {
    console.log(goal)
    this.setState({
      user_data: Object.assign(this.state.user_data, { calorie_goal: goal })
    });
  }

  render() {
    // Router must be where it is on the tree, don't put providers below it.
    return (
      <UserContext.Provider value={{
          updateGoal: this.updateGoal,
          ...this.state.user_data}}>
        <Router>
          <React.Fragment>
            <Header username={this.state.user_data.username}
                    role={this.state.user_data.role}
                    logout={this.logout}/>
            <div className="flex-horizontal after-navbar">
              <Sidebar/>
              <div className="sidebar-placeholder"/>
              <div className="page-zone">
                <AlertZone messages={this.state.alert_messages}/>
                <div className="page-area">
                  <PageRouting ctx={this}/>
                </div>
              </div>
            </div>
          </React.Fragment>
        </Router>
      </UserContext.Provider>
    )
  }
}

render(<App/>, document.body);
