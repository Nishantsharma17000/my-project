
import axios from 'axios';

const CTP_AUTH_URL = 'https://auth.eu-central-1.aws.commercetools.com';
const CTP_API_URL = 'https://api.eu-central-1.aws.commercetools.com';
const CTP_PROJECT_KEY = 'ecommerce-site';
const CTP_CLIENT_ID = 'peRu8HGP3K8NumCFny2pVxT8';
const CTP_CLIENT_SECRET = '0xqwx9msW6hr7DMfG96h85VOxgYB-TNA';
const CTP_SCOPES =
  'manage_project:ecommerce-site view_audit_log:ecommerce-site manage_api_clients:ecommerce-site view_api_clients:ecommerce-site';

const fetchAccessToken = async () => {
  try {
    const response = await axios.post(
      `${CTP_AUTH_URL}/oauth/token`, 
      `grant_type=client_credentials&scope=${CTP_SCOPES}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

const createCustomer = async (accessToken, customerData) => {
  try {
    const response = await axios.post(
      `${CTP_API_URL}/${CTP_PROJECT_KEY}/customers`,
      customerData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('Created Customer:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

const fetchAllCustomers = async (accessToken) => {
  try {
    const response = await axios.get(`${CTP_API_URL}/${CTP_PROJECT_KEY}/customers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Fetched Customers:', response.data.results);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

const fetchAllProducts = async (accessToken) => {
  try {
    const response = await axios.get(`${CTP_API_URL}/${CTP_PROJECT_KEY}/product-projections`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('Fetched Products:', response.data.results);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${CTP_AUTH_URL}/oauth/token`,
      `grant_type=password&username=${email}&password=${password}&scope=${CTP_SCOPES}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};


const fetchData = async () => {
  try {
    const accessToken = await fetchAccessToken();
   
    await fetchAllProducts(accessToken);
    await fetchAllCustomers(accessToken);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


fetchData();

export { fetchAccessToken, createCustomer, fetchAllCustomers, fetchAllProducts, login };