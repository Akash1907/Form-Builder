
import axios from 'axios';

export const generateReport = async (credentials:any) => {
   const  apiEndpoint = "https://www.preview.assisto.tech/flask/"
    // const useProxyForKnownCorsIssues = process.env.REACT_APP_ENV?true:false;
    // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const apiUrl = useProxyForKnownCorsIssues
    //   ? `${corsProxyUrl}${apiEndpoint}`
    //   : apiEndpoint;

    const response = await axios.post(apiEndpoint, credentials, { timeout: 5000000 });
    return response.data;
};