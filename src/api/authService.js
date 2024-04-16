import axios from 'axios';

const CTP_AUTH_URL = 'https://auth.eu-central-1.aws.commercetools.com';
const CTP_CLIENT_ID = 'peRu8HGP3K8NumCFny2pVxT8';
const CTP_CLIENT_SECRET = '0xqwx9msW6hr7DMfG96h85VOxgYB-TNA';
const CTP_API_URL = 'https://api.eu-central-1.aws.commercetools.com';
const CTP_SCOPES =
  'manage_project:ecommerce-site view_audit_log:ecommerce-site manage_api_clients:ecommerce-site view_api_clients:ecommerce-site';

const generateBearerToken = () => {
  return `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`;
};

const fetchAccessToken = async () => {
  try {
    const response = await axios.post(
      `${CTP_AUTH_URL}/oauth/token`,
      `grant_type=client_credentials&scope=${CTP_SCOPES}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: generateBearerToken(),
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

const authenticateUser = async (email, password) => {
  try {
    const CTP_PROJECT_KEY = 'ecommerce-site';
  
    const authApiUrl = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/login`;

    const headers = {
      Authorization: `Bearer ${await fetchAccessToken()}`, // Automatically get the bearer token
      'Content-Type': 'application/json',
    };

    console.log('Request URL:', authApiUrl);
    console.log('Request Headers:', headers);
    console.log('Request Payload:', { email, password });

    const response = await axios.post(authApiUrl, { email, password }, { headers });

    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

   
    const authToken = response.data.token; 
    console.log('Authentication successful. Token:', authToken);

   
    return authToken;
  } catch (error) {
    console.error('Error during authentication:', error);

    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }

    throw error;
  }
};

export { authenticateUser, fetchAccessToken };