import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api-realty-estate.xn--hthng-171byc.vn:3000',
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    console.error('API Error:', {
      status,
      message,
    });

    return Promise.reject({
      status,
      message,
    });
  }
);

export default API;
