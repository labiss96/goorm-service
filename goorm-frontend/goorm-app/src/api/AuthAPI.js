import axios from "axios";
import { tokenConfig } from "./TokenConfig";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {
  authRegister(data) {
    return axios.post("auth/register/", data);
  },

  getUsers() {
    return axios.get(`auth/user/`, tokenConfig());
  },

  authLogin(data) {
    console.log("run login API.");
    return axios.post("auth/login/", data);
  },
  authLogout() {
    console.log("run logout API.");
    return axios.post("auth/logout/", null, tokenConfig());
  },
  certifyAdult(data) {
    console.log("run certifyAdult API.");
    return axios.post("certify/", data);
  },
};
