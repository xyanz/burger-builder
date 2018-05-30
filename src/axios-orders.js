import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-83f21.firebaseio.com/'
});

export default instance;