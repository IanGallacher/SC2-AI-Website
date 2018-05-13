//import 'normalize.css'; // Standardize the dom elements before continuing.
import "./../../css/style.scss";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import PageRouting from "./page-routing.js";
import AlertLogic from "./../logic/alert.js";
import LoginLogic from "./../logic/login.js";

import { ModalContext } from "./../context/modal-context.js";
import { UserContext } from "./../context/user-context.js";
import AlertZone from "./../component/alert.jsx";
import Header from "./../component/header.jsx";
import Modal from "./../component/modal.jsx";

export var API_URL = "/api";

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
      },
      modalContent: "No content"
    };

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
    AlertLogic.notify = alert_messages => this.setState({ alert_messages });
    LoginLogic.notify = user_data => this.setState({ user_data });
  }

  updateGoal = goal => {
    this.setState({
      user_data: Object.assign(this.state.user_data, { calorie_goal: goal })
    });
  }

  showModal = modalContent => {
    this.setState({modalContent});
  }

  render() {
    // Router must be where it is on the tree, don't put providers below it.
    return (
      <UserContext.Provider value={{
        updateGoal: this.updateGoal,
        ...this.state.user_data}}>
        <ModalContext.Provider value={{showModal: this.showModal}}>
          <Router>
            <React.Fragment>
              <Header username={this.state.user_data.username}
                role={this.state.user_data.role}
                logout={this.logout}/>
              <div className="flex-horizontal main-content">
                <div className="page-zone">
                  <div className="page-scroll-offset flex-vertical">
                    <AlertZone messages={this.state.alert_messages}/>
                    <div className="page-area">
                      <PageRouting ctx={this}/>
                    </div>
                  </div>
                </div>
              </div>
              <Modal modalContent={this.state.modalContent}/>
            </React.Fragment>
          </Router>
        </ModalContext.Provider>
      </UserContext.Provider>
    );
  }
}

render(<App/>, document.getElementById("app"));
