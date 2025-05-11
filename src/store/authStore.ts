import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  roles: string[];
  login: (userData: User) => void;
  updateRoles: (roles: string[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      roles: [],
      login: (userData: User) => set({ isAuthenticated: true, user: userData }),
      updateRoles: (roles: string[]) => set({ roles }),
      logout: () => set({ isAuthenticated: false, user: null, roles: [] }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 