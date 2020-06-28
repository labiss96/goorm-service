import axios from "axios";
import { tokenConfig } from "./TokenConfig";

export default {
  // Clinic API
  getAllClinic() {
    console.log("run get all Clinic API.");
    return axios.get("service/clinic/", tokenConfig());
  },
  createClinic(data) {
    console.log("run create Clinic API.");
    return axios.post("service/clinic/", data, tokenConfig());
  },
  updateClinic(data, id) {
    console.log("run update Clinic API.");
    return axios.put(`service/clinic/${id}/`, data, tokenConfig());
  },
  deleteClinic(id) {
    console.log("run delete Clinic API.");
    return axios.delete(`service/clinic/${id}/`, tokenConfig());
  },
  getClinic(id) {
    console.log("run get Clinic API.");
    return axios.get(`service/clinic/${id}/`, tokenConfig());
  },
};
