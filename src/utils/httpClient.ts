import axios from 'axios';

const client = axios.create({
  baseURL: 'https://mate.academy/students-api',
});

export default client;
