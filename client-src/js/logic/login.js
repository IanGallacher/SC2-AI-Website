import axios from 'axios'
import { API_URL } from './../routing/app.js'
import AlertLogic from './alert.js'

export default class LoginLogic {
  // Useful for displaying what is (most likely) the correct data,
  // when waiting for the server to verify.
  static isLoggedIn() {
    return (
               localStorage.getItem("username")
            || !localStorage.getItem("username") == ""
          );
  }
  
  static setUserData() {
    return new Promise (function (resolve, reject) {
      axios.get(API_URL + "/users")
      .then(function (response) {
	resolve(response);
      });
    })
  }

  static login(ctx) { // ctx is shorthand for the context of the react component
    return new Promise (function (resolve, reject) {
      axios.post(API_URL + "/login", {
        "username": ctx.state["username"],
        "password": ctx.state["password"]
      })
      .then(function (response) {
	LoginLogic.setUserData();
        resolve(response.data);
      })
      .catch(function (error) {
        const message = error.response.data.message;
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

      instance.get(API_URL + "/logout")
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          const codes = error.response.data.error.details.codes;
          Object.entries(codes).forEach(
            function([key, value]) {
              AlertLogic.addMessage(key + " " + value[0]);
            }
          );
          //reject(error);
        });
    });
  }

  static signUp(ctx) { // ctx is shorthand for the context of the react component
    return new Promise (function (resolve, reject) {
      axios.post(API_URL + "/users", {
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
