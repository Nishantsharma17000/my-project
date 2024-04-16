// testApi.js

import { fetchAccessToken, createCustomer, fetchProducts } from './api/commerceToolsApi';

// Function to test fetching the access token
const testFetchAccessToken = async () => {
  try {
    const accessToken = await fetchAccessToken();
    console.log('Access Token:', accessToken);
  } catch (error) {
    console.error('Error testing access token:', error);
  }
};

// Function to test creating a customer
const testCreateCustomer = async () => {
  try {
    const accessToken = await fetchAccessToken();
    await createCustomer(accessToken);
  } catch (error) {
    console.error('Error testing create customer:', error);
  }
};

// Function to test fetching products
const testFetchProducts = async () => {
  try {
    const accessToken = await fetchAccessToken();
    const productsData = await fetchProducts(accessToken);
    console.log('Fetched Products:', productsData.results);
  } catch (error) {
    console.error('Error testing fetch products:', error);
  }
};

// Run the test functions
testFetchAccessToken();
testCreateCustomer(); // Uncomment to test customer creation
testFetchProducts();
