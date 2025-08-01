import Axios from "axios";
//import https from "https";

export const baseURL = "http://localhost:3020/";

/*const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});*/

// Create an instance of Axios with custom configuration
const axios = Axios.create({
  baseURL: baseURL, // Set your base URL here
  // httpsAgent: httpsAgent,
});

// Create an HTTPS agent that ignores SSL certificate errors

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Check if the error is due to an expired token
      const errorMessage = error.response.data.StatusCode;
      if (errorMessage == 6) {
      }
    }
    return Promise.reject(error);
  }
);

export const parsedData = <T>(data: string): T => {
  return JSON.parse(data) as T;
};

export default axios;
