import create from 'zustand';

// Define the state type for the store
interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the Zustand store with the type for state
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  login: () => {
    localStorage.setItem('isAuthenticated', 'true');
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
