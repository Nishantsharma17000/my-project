// src/components/MainComponent.js

import React, { useState, useEffect } from 'react';
import { fetchAccessToken, createCustomer, fetchAllCustomers } from '../api/commerceToolsApi';

const MainComponent = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    // Fetch the access token and update state
    fetchAccessToken()
      .then((token) => setAccessToken(token))
      .catch((error) => console.error('Error fetching access token:', error));

    // Create a customer (uncomment if needed)
    // createCustomer(accessToken);

    // Fetch all customers
    fetchAllCustomers(accessToken)
      .then((data) => console.log('Customers:', data.results))
      .catch((error) => console.error('Error fetching customers:', error));
  }, [accessToken]);

  return (
    <div>
      <h1>Commerce Tools Integration</h1>
      {/* Your UI components go here */}
    </div>
  );
};

export default MainComponent;
