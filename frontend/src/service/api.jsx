import axios from 'axios';
import Cookie from 'js-cookie';

export const api = axios.create({
    baseURL: process.env.REACT_APP_HOSTNAME_BACKEND,
    headers: { 
        'Authorization': 'Bearer ' + Cookie.get("token") 
      }
})

api.interceptors.request.use(
    function(config) {
      const token = Cookie.get("token") 
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  )