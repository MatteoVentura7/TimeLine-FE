import axios from "axios";

const BaseUrl = `http://localhost:3000/users`;
const LoginUrl = `/login`;
const ForgotPasswordUrl = `/reset-password`;
const ResetPasswordUrl = `/verify-reset-token?token=`;
const ConfirmEmailUrl = `/verify-email-token?token=`;

class backendService {
  /************* LOGIN *************/

  static login({ email, password, role, name, surname }) {
    return axios.post(`${BaseUrl}${LoginUrl}`, {
      email,
      password,
      role,
      name,
      surname,
    });
  }

  /************* FORGOT PASSWORD *************/

  static ForgotPassword({ email }) {
    return axios.post(`${BaseUrl}${ForgotPasswordUrl}`, { email });
  }

  /************* RESET PASSWORD *************/

  static verifyResetToken(token) {
    return axios.get(`${BaseUrl}${ResetPasswordUrl}${token}`);
  }

  /************* CONFIRM EMAIL *************/

  static confirmEmail(token) {
    return axios.get(`${BaseUrl}${ConfirmEmailUrl}${token}`);
  }

  /************* DELETE USER *************/

  static deleteUser(userId) {
    return axios.delete(`${BaseUrl}/${userId}`);
  }
}

export default backendService;
