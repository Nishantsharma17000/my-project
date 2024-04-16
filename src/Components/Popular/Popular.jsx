import React, { useState, useEffect } from 'react';
import './Popular.css';
import axios from 'axios';
import Item from '../Item/Item';

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

const Popular = () => {
  const [accessToken, setAccessToken] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the access token
        const token = await fetchAccessToken();
        setAccessToken(token);

        // Fetch products using the obtained access token
        const productsData = await fetchAllProducts(token);

        // Limit to 4 products
        const limitedProducts = productsData.results.slice(0, 4);

        setProducts(limitedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {products.map((product, index) => (
          <Item
            key={index}
            id={product.id}
            name={product.name['en-US']}
            image={product.masterVariant.images[0]?.url || 'fallbackImageUrl'}
            new_price={product.masterVariant.prices[0]?.value.centAmount / 100 || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
