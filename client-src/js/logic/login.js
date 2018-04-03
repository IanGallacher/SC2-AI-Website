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

  static getUserData() {
    return new Promise ((resolve, reject) => {
      axios.get(API_URL + "/users")
      .then((response) => {
	      resolve(response);
      });
    })
  }

  static login(login_data) {
  console.log(this);
    return new Promise ((resolve, reject) => {
      axios.post(API_URL + "/login", {
        "username": login_data["username"],
        "password": login_data["password"]
      })
      .then((response) => {
        localStorage.setItem("username", response.data.username);
        this.getUserData().then((response) => {
        	if (response.data) {
            this.notify({ "username": response.data.username,
                			    "user_id": response.data.id,
                          "role": response.data.role });
          }
        });
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
        AlertLogic.addMessage(message);
        //reject(Error(message));
      });
    });
  }

  static logout() {
  console.log(this);
    return new Promise ((resolve, reject) => {
      axios.get(API_URL + "/logout")
      .then((response) => {
      console.log(this);
        localStorage.setItem("username", "");
        this.notify({ "username": "",
            			    "user_id": "",
                      "role": "" });
        resolve(response.data);
      })
      .catch((error) => {
        const codes = error;
        console.log(error);
        Object.entries(codes).forEach(
          ([key, value]) => {
            AlertLogic.addMessage(key + " " + value[0]);
          }
        );
        //reject(error);
      });
    });
  }

  static signUp({username, email, password, password_confirmation}) {
    console.log(username); console.log(email); console.log(password);
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
