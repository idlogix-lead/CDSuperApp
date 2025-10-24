import instance from './baseURL';

class ApiService{
  static async get(url, params = {}, config = {}) {
    try {
      const response = await instance.get(url, { params, ...config });
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
