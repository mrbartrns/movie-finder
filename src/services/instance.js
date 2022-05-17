import axios from 'axios';
const baseURL = `https://www.omdbapi.com`;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API_DEFAULT_PARAMS = {
  apikey: process.env.API_KEY,
};

export { API_DEFAULT_PARAMS };
export default instance;
