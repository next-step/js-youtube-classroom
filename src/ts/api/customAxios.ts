import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
});

export default customAxios;
