//import 'normalize.css'; // Standardize the dom elements before continuing.
import "./../css/style.scss";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import PageRouting from "./page-routing.js";
import AlertLogic from "./logic/alert.js";
import LoginLogic from "./logic/login.js";

import { ModalContext } from "./context/modal-context.js";
import { UserContext } from "./context/user-context.js";
import AlertZone from "./component/alert.jsx";
import Header from "./component/header.jsx";
import Modal from "./component/modal.jsx";

export var API_URL = "/api";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert_messages: [],
      user_data: {
        username: "",
        id: "",
        role: ""
      }
    };

    LoginLogic.getUserData().then((response) => {
      if (response.data)
        this.setState({
          user_data: {
            username: response.data.email,
            id: response.data.id,
            role: response.data.role
          }
        });
    });

    // Register callback that will render new notifications.
    AlertLogic.notify = alert_messages => this.setState({ alert_messages });
    LoginLogic.notify = user_data => this.setState({ user_data });
  }

  showModal = (m) => { this.modal.showModal(m); }

  closeModal = (m) => { this.modal.closeModal(m); }

  render() {
    // Router must be where it is on the tree, don't put providers below it.
    return (
      <UserContext.Provider value={{
        updateGoal: this.updateGoal,
        ...this.state.user_data}}>
        <ModalContext.Provider value={
          {
            showModal: this.showModal,
            closeModal: this.closeModal
          }
        }>
          <Router>
            <React.Fragment>
              <Header username={this.state.user_data.username}
                role={this.state.user_data.role}
                logout={this.logout}/>
              <div className="scroll-zone">
                <div className="page-zone">
                  <AlertZone messages={this.state.alert_messages}/>
                  <PageRouting ctx={this}/>
                </div>
              </div>
              <Modal ref={r => this.modal = r}/>
            </React.Fragment>
          </Router>
        </ModalContext.Provider>
      </UserContext.Provider>
    );
  }
}

render(<App/>, document.getElementById("app"));
