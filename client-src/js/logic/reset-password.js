import axios from "axios";
import { API_URL } from "./../app.js";

export default class ResetPasswordLogic {

  static sendResetPasswordInstructions({email}) {
    return new Promise ((resolve, reject) => {
      axios.post(API_URL + "/password_reset", {
        "email": email
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
