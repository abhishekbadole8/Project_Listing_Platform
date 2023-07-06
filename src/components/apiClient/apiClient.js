import axios from "axios";

const apiClient = axios.create({
   baseURL: `https://project-listing-platform.onrender.com`,
});

export default apiClient;
