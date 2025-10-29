import instance from '../BaseURL/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService{
static async get(url, params = {}, config = {}) {
  try {
    // Manually get token from AsyncStorage
    const token = await AsyncStorage.getItem('auth_token');
    console.log('Auth Token:', token);

    // Merge headers with Authorization
    const finalConfig = {
      params,
      ...config,
      headers: {
        ...(config.headers || {}),
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    console.log('Final Request Headers:', finalConfig.headers);

    const response = await instance.get(url, finalConfig);
    return response.data;
  } catch (error) {
    this.handleError(error);
  }
}


  static async post(url, data = {}, config = {}) {
    try {
      const response = await instance.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async put(url, data = {}, config = {}) {
    try {
      const response = await instance.put(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async delete(url, config = {}) {
    try {
      const response = await instance.delete(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static handleError(error) {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Request Error:', error.message);
      throw new Error(error.message);
    }
  }
}

export default ApiService;
