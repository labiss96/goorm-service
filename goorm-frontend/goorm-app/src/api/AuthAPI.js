import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default {
  registerUser() {
    return axios.get(`rest-auth/registration/`);
  },
  getUsers() {
    return axios.get(`rest-auth/user/`);
  },
};
