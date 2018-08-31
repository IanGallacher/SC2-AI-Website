import axios from "axios";
import { API_URL } from "./../app.js";

export default class ResetPasswordLogic {

  static sendResetPasswordInstructions({email}) {
    return new Promise ((resolve, reject) => {
      axios.post(`${API_URL}/password_reset`, { email })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const codes = error.response.data;
          reject(codes);
        });
    });
  }

  static resetPassword(reset_password_token, {password, password_confirmation}) {
    return new Promise ((resolve, reject) => {
      axios.put(`${API_URL}/users/password.json`, {
        user: { reset_password_token, password, password_confirmation }
      })
        .then(response => { resolve(response.data); })
        .catch(error => { reject(error.response.data); });
    });
  }
}
