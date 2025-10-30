import axios from "axios";

const BaseUrl = `http://localhost:3000/users`
const LoginUrl = `/login`

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
}

/************* LOGIN *************/

export default backendService;