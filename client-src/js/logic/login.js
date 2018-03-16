import axios from 'axios'

import { API_URL } from './../routing/app.js'

import AlertLogic from './alert.js'

export default class LoginLogic {
  static isLoggedIn() {
    return (
               localStorage.getItem("access_token")
            || !localStorage.getItem("access_token") == ""
          );
  }

  static getAccessToken() {
    return localStorage.getItem("access_token");
  }

  static login(ctx) { // ctx is shorthand for the context of the react component
    return new Promise (function (resolve, reject) {
      axios.post(API_URL + "/credentials/login", {
        "username": ctx.state["username"],
        "password": ctx.state["password"]
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        const message = error.response.data.error.message;
        AlertLogic.addMessage(message);
        //reject(Error(message));
      });
    });
  }

  static logout(ctx) { // ctx is shorthand for the context of the react component
    return new Promise (function (resolve, reject) {
      const access_token = localStorage.getItem("access_token");

      localStorage.setItem("access_token", "");
      localStorage.setItem("user_id", "");

      let instance = axios.create({
        headers: {'Authorization': access_token}
      });

      instance.post(API_URL + "/credentials/logout", {})
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          const codes = error.response.data.error.details.codes;
          Object.entries(codes).forEach(
            function([key, value]) {
              AlertLogic.addMessage(key + " " + value[0]);
              //ctx.setState({ errors: ctx.state.errors.concat({field: key, errors: value}) });
            }
          );
          //reject(error);
        });
    });
  }

  static signUp(ctx) { // ctx is shorthand for the context of the react component
    return new Promise (function (resolve, reject) {
      axios.post(API_URL + "/credentials", {
        "username": ctx.state["username"],
        "email": ctx.state["email"],
        "password": ctx.state["password"]
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        const codes = error.response.data.error.details.codes;
        Object.entries(codes).forEach(
          function([key, value]) {
            AlertLogic.addMessage(key + " " + value[0]);
            //ctx.setState({ errors: ctx.state.errors.concat({field: key, errors: value}) });
          }
        );
      });
    });
  }
}
