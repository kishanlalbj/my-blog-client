import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const instance = axios.create({
  baseURL: `${API_URL}`
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
