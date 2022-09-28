import axios from 'axios';

const api = axios.create({
  baseURL: 'https://delta-delivery.herokuapp.com',
});

export default api;
