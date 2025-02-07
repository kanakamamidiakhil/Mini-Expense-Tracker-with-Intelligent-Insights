// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { loginUser } from '../services/api';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      login(response.data); // Store user info in context
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
