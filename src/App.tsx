import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Group } from '@mantine/core';
import useAuthStore from './store/authStore';

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Container size="md" pt="md">
      {isAuthenticated && (
        <Group position="right" mb="md">
          <Button variant="outline" color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      )}
      <Outlet />
    </Container>
  );
}
