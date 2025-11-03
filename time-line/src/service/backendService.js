import axios from "axios";

class BackendService {

  static BaseUrl = `http://localhost:3000/users`;
  static LoginUrl = `/login`;
  static ForgotPasswordUrl = `/reset-password`;
  static ResetPasswordUrl = `/verify-reset-token?token=`;
  static ConfirmEmailUrl = `/verify-email-token?token=`;
  static UptadeUserUrl = `/update-email/`;
  static changePasswordUrl = `/change-password/`;
  static UserInfoUrl = `/user-info`;
  static confirmEmailRequestUrl = `/confirm-email`;
  static updatePasswordUrl = `/update-password`;

  /************* LOGIN *************/

  login({ email, password, role, name, surname }) {
    return axios.post(`${BackendService.BaseUrl}${BackendService.LoginUrl}`, {
      email,
      password,
      role,
      name,
      surname,
    });
  }

  /************* FORGOT PASSWORD *************/

  ForgotPassword({ email }) {
    return axios.post(`${BackendService.BaseUrl}${BackendService.ForgotPasswordUrl}`, { email });
  }

  /************* RESET PASSWORD *************/

  verifyResetToken(token) {
    return axios.get(`${BackendService.BaseUrl}${BackendService.ResetPasswordUrl}${token}`);
  }

  resetPassword(token, newPassword) {
    return axios.put(`${BackendService.BaseUrl}${BackendService.updatePasswordUrl}`, { token, newPassword });
  }
  /************* CONFIRM EMAIL *************/

  confirmEmail(token) {
    return axios.get(`${BackendService.BaseUrl}${BackendService.ConfirmEmailUrl}${token}`);
  }

  confirmEmailRequest(token) {
    return axios.post(`${BackendService.BaseUrl}${BackendService.confirmEmailRequestUrl}`, { token });
  }

  /************* DELETE USER *************/

  deleteUser(userId) {
    return axios.delete(`${BackendService.BaseUrl}/${userId}`);
  }

  /************* REGISTER USER *************/

  register({ email, password, role, name, surname }) {
    return axios.post(`${BackendService.BaseUrl}`, { email, password, role, name, surname });
  }

  /************* DETAILS USER *************/

  userDetails(userId) {
    return axios.get(`${BackendService.BaseUrl}/${userId}`);
  }

  /************* UPDATE USER *************/

  updateUser({ userId, email, isConfirmed, name, surname, role }) {
    return axios.put(`${BackendService.BaseUrl}${BackendService.UptadeUserUrl}${userId}`, {
      email,
      isConfirmed,
      name,
      surname,
      role,
    });
  }

  /************* CHANGE PASSWORD *************/

  changePassword({ userId, newPassword, confirmPassword }) {
    return axios.put(`${BackendService.BaseUrl}${BackendService.changePasswordUrl}${userId}`, {
      newPassword,
      confirmPassword,
      id: userId,
    });
  }

  /*************  USER INFO *************/

  userInfo(token) {
    return axios.get(`${BackendService.BaseUrl}${BackendService.UserInfoUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /************* FETCH USERS *************/

  fetchUsers(page, limit) {
    return axios.get(`${BackendService.BaseUrl}?page=${page}&limit=${limit}`);
  }

  /************* RELOAD USERS *************/

  reloadUsers(page, limit) {
    return axios.get(`${BackendService.BaseUrl}?page=${page}&limit=${limit}`);
  }
}

const BackendServiceInstance = new BackendService();
export default BackendServiceInstance;
