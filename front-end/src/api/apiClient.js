import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://3.39.143.119:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
