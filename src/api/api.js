import axios from "axios";
import {LOGIN} from "../consts/auth.const";
import {getStorage} from "../services/storage.service";

// Test api URL
const baseURL = `https://dev.foodworking.ru/api/v1/`;

// Prod api URL
// const baseURL = `https://api.foodworking.ru/api/v1/`;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((request) => {
  const {url} = request;
  if (url !== LOGIN) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${getStorage("accessToken")}`,
    };
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  ({response}) => {
    const {status, config} = response || {};
    if ((status === 401 || status === 403) && config.url !== LOGIN) {
      // window.location.href = LOGIN;
      localStorage.clear();
    }

    return Promise.reject(response);
  }
);

export default axiosInstance;
