import axios from "axios";
import { tokenConfig } from "./TokenConfig";

export default {
  // Brand API
  getAllBrand() {
    console.log("run get all Brand API.");
    return axios.get("product/brand/", tokenConfig());
  },
  createBrand(data) {
    console.log("run create Brand API.");
    return axios.post("product/brand/", data, tokenConfig());
  },
  updateBrand(data, id) {
    console.log("run update Brand API.");
    return axios.put(`product/brand/${id}/`, data, tokenConfig());
  },
  deleteBrand(id) {
    console.log("run delete Brand API.");
    return axios.delete(`product/brand/${id}/`, tokenConfig());
  },
  getBrand(id) {
    console.log("run get Brand API.");
    return axios.get(`product/brand/${id}/`, tokenConfig());
  },

  // Tobacco API
  getAllTobacco() {
    console.log("run get all Tobacco API.");
    return axios.get("product/tobacco/", tokenConfig());
  },
  createTobacco(data) {
    console.log("run create Tobacco API.");
    console.log(data);
    return axios.post("product/tobacco/", data, tokenConfig());
  },
  updateTobacco(data, id) {
    console.log("run update Tobacco API.");
    return axios.put(`product/tobacco/${id}/`, data, tokenConfig());
  },
  deleteTobacco(id) {
    console.log("run delete Tobacco API.");
    return axios.delete(`product/tobacco/${id}/`, tokenConfig());
  },
  getTobacco(id) {
    console.log("run get Tobacco API.");
    return axios.get(`product/tobacco/${id}/`, tokenConfig());
  },

  //Review API
  getReviews(tobacco_id) {
    console.log("run get Reviews API.");
    return axios.get(
      `product/tobacco/${tobacco_id}/get_reviews/`,
      tokenConfig()
    );
  },
  createReview(data) {
    console.log("run create Review API", data);
    return axios.post("product/review/", data, tokenConfig());
  },

  deleteReview(id) {
    console.log("run delete Review API.");
    return axios.delete(`product/review/${id}/`, tokenConfig());
  },
};
