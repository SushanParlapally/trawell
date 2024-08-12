// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated from useHistory
import { useAuth } from './Auth/useAuth';
import { motion } from 'framer-motion';
import { Container, Form, Input, Button } from './Styles'; // Ensure styles file is correctly named and located

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Updated from useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/'); // Updated from history.push
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Log In</Button>
        </Form>
      </motion.div>
    </Container>
  );
};

export default Login;
