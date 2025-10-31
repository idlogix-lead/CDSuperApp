import ApiService from '../Apicall/api_call';

export const getUsers = async () => {
  try {
    const data = await ApiService.get('/v1/models/AD_User');
    console.log('Users:', data);
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};
