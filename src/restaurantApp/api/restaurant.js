import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.1.128:8000',//https://192.168.1.128:5001/',
  crossDomain: true,
});
