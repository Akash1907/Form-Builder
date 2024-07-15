const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const DOMAIN_BASE_URL = process.env.DOMAIN_BASE_URL;

const endpoints = {
  auth: {
    login: `${BASE_URL}/login`
  },
  user: {
    getUser: (userId: string) => `${BASE_URL}/users/${userId}`,
    updateUser: (userId: string) => `${BASE_URL}/users/${userId}`,
  },
  dailogmanager: {
    workflow: `${DOMAIN_BASE_URL}/diaflow/save_data`,
    executeflow: `${DOMAIN_BASE_URL}/diaflow/execute_flow`,
    storeconversation:`${DOMAIN_BASE_URL}/utility/store_conversation`,
    processtext:`${DOMAIN_BASE_URL}/utility/process_text`,
  },
};

export default endpoints;
