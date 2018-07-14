import axios from "axios";
import { API_URL } from "./../app.js";
import AlertLogic from "./alert.js";

export default class LoginLogic {
  // Useful for displaying what is (most likely) the correct data,
  // when waiting for the server to verify.
  static isLoggedIn() {
    return (
      localStorage.getItem("username")
            || !localStorage.getItem("username") == ""
    );
  }

  static getUserData() {
    return new Promise (resolve => {
      axios.get(API_URL + "/users")
        .then(response => resolve(response) );
    });
  }

  static login(login_data) {
    return new Promise (resolve => {
      axios.post(API_URL + "/login", {
        "username": login_data["username"],
        "password": login_data["password"]
      })
        .then(response => {
          localStorage.setItem("username", response.data.username);
          this.getUserData().then(response => {
            if (response.data) {
              this.notify({
                "username": response.data.username,
                "id": response.data.id,
                "role": response.data.role
              });
            }
          });
          resolve(response.data);
        })
        .catch(error => AlertLogic.addError(error.response.data.message));
    });
  }

  static logout() {
    return new Promise (resolve => {
      axios.get(API_URL + "/logout")
        .then(response => {
          localStorage.setItem("username", "");
          this.notify({
            "username": "",
            "id": "",
            "role": ""
          });
          resolve(response.data);
        })
        .catch(error => {
          Object.entries(error).forEach(
            ([key, value]) => {
              AlertLogic.addError(`${key} ${value[0]}`);
            }
          );
        //reject(error);
        });
    });
  }

  static signUp({username, email, password, password_confirmation}) {
    return new Promise ((resolve, reject) => {
      axios.post(API_URL + "/users", {
        "username": username,
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const codes = error.response.data;
          reject(codes);
        });
    });
  }
}
