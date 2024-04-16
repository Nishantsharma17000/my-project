import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {authenticateUser} from '../api/authService';
import './CSS/LoginSignup.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const accessToken = await authenticateUser(email, password);
      console.log('Login successful. Access Token:', accessToken);
      let path = `/`;
      navigate(path);
    } catch (error) {
      console.error('Error during login:', error);
   
      console.log('Full error details:', error.response);
     
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p className='loginsignup-login'>Don't have an account? <Link to="/signup"><span>Sign Up here</span></Link></p>
        <div className="loginsignup-agree">
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;