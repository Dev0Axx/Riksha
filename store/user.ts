import { create } from 'zustand';

interface StateUser {
  username: string;
  email: string;
  setUser: (username: string, email: string) => void;
}

export const useUserState = create<StateUser>()((set) => ({
  username: '',
  email: '',
  setUser: (username: string, email: string) =>
    set({ username: username, email: email }),
}));
