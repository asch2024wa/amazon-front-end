import axios from "axios";
export const axiosInstant = axios.create({
  // baseURL: "http://localhost:4444"
  baseURL: "https://amazon-api-deploy-pzpr.onrender.com",
});
