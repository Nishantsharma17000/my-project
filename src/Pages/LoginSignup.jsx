import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
// import { createCustomer } from '../api/commerceToolsApi'; 
import { createCustomer, fetchAccessToken } from '../api/commerceToolsApi';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = await fetchAccessToken(); // Assuming you want to get a fresh access token for each submission
      await createCustomer(accessToken, { email, password, name });
      // Additional logic if needed after creating a customer
      routeChange();
    } catch (error) {
      // Handle errors
      console.error('Error handling form submission:', error);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Continue</button>
        </form>
        <p className='loginsignup-login'>Already have an account? <Link to="/login"><span>Login here</span></Link></p>
        <div className="loginsignup-agree">
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;