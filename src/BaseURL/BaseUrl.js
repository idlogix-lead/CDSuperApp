import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  //   baseURL: 'https://194.163.180.69:8434/api',
  // baseURL: 'http://194.163.180.69:8072/api',
  baseURL: 'https://infinitycitidev.duckdns.org/api',
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('auth_token');
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
