import axios from "axios";
import { tokenConfig } from "./TokenConfig";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {
  registerUser() {
    return axios.get(`rest-auth/registration/`);
  },

  getUsers() {
    return axios.get(`rest-auth/user/`, tokenConfig());
  },

  authLogin(data) {
    console.log("run login API.");
    return axios.post("rest-auth/login/", data);
  },
  authLogout() {
    console.log("run logout API.");
    return axios.post("rest-auth/logout/", null, tokenConfig());
  },
};
