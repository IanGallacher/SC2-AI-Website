import axios from 'axios'

import { API_URL } from './../component/app.js'

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
        console.log(error.response);
        const message = error.response.data.error.message;
        reject(Error(message));
        // notification that the error did not work
        //ctx.setState({ error: message });
      });
    });
  }

  static logout(ctx) { // ctx is shorthand for the context of the react component
    return new Promise (function (resolve, reject) {
      const access_token = localStorage.getItem("access_token");

      let instance = axios.create({
        headers: {'Authorization': access_token}
      });

      instance.post(API_URL + "/credentials/logout", {})
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(response.data);
        });
    });
  }

  static signUp(ctx) { // ctx is shorthand for the context of the react component
    return new Promise (function (resolve, reject) {
      axios.post(API_URL + "/credentials", {
        "username": this.state["username"],
        "email": this.state["email"],
        "password": this.state["password"]
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        const codes = error.response.data.error.details.codes;
        ctx.state.errors = [];
        Object.entries(codes).forEach(
          function([key, value]) {
            ctx.setState({ errors: ctx.state.errors.concat({field: key, errors: value}) });
          }
        );
      });
    });
  }
}
