import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:5000`,
  // baseURL: `https://project-listing-platform.onrender.com`,
});

export default apiClient;
