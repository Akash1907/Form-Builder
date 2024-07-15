import endpoints from '../endpoints/endpoints';
import axios from 'axios';

export const workflow = async (payload:any) => {
  try {
    const response = await axios.post(endpoints.dailogmanager.workflow, payload);
    return response.data;
  } catch (error) {
    console.error('Error in workflow:', error);
    throw error; // Re-throw the error to be caught in onSubmit
  }
};
export const executeflow = async (payload:any) => {
  try {
    const response = await axios.post(endpoints.dailogmanager.executeflow, payload);
    return response.data;
  } catch (error) {
    console.error('Error in execute flow:', error);
    throw error; // Re-throw the error to be caught in onSubmit
  }
};

export const storeConversation = async (payload:any) => {
  try {
    const response = await axios.post(endpoints.dailogmanager.storeconversation, payload);
    return response.data;
  } catch (error) {
    console.error('Error in execute flow:', error);
    throw error; // Re-throw the error to be caught in onSubmit
  }
};
export const processText = async (payload:any) => {
  try {
    const response = await axios.post(endpoints.dailogmanager.processtext, payload);
    return response.data;
  } catch (error) {
    console.error('Error in execute flow:', error);
    throw error; // Re-throw the error to be caught in onSubmit
  }
};

