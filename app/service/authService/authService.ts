import endpoints from '../endpoints/endpoints';
import axios from 'axios';

export const login = async (credentials:any) => {
  const response = await axios.post(endpoints.auth.login, credentials);
  return response.data;
};