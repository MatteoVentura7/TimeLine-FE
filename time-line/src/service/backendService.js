import axios from "axios";

const BaseUrl = `http://localhost:3000/users`;
const LoginUrl = `/login`;
const ResetPasswordUrl = `/reset-password`;

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
    return axios.post(`${BaseUrl}${ResetPasswordUrl}`, { email });
  }

  /************* RESET PASSWORD *************/

  static verifyResetToken(token) {
    return axios.get(`${BaseUrl}/verify-reset-token?token=${token}`);
  }
}

export default backendService;
