import { Button, Container, TextInput, Title, Paper, Stack } from '@mantine/core';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add any validation if needed, like checking the username and password
    if (username.trim() && password.trim()) {
      login(username); // Login with username (you can also add password handling here if needed)
      navigate('/resources'); // Navigate to resources page after login
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" mb="lg">Welcome to Script Assist</Title>
      <Paper shadow="md" p="lg" radius="md" withBorder>
        <Stack>
          {/* Username Field */}
          <TextInput
            label="Username"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* Password Field */}
          <TextInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth onClick={handleLogin}>
            Sign In
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPage;
