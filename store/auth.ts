import { create } from 'zustand';

interface StateAuth {
  active: boolean;
  setStateAuth: (active: boolean) => void;
}
export const useStateAuth = create<StateAuth>()((set) => ({
  active: true,
  setStateAuth: (active: boolean) => set({ active }),
}));
