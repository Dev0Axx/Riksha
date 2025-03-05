import { create } from 'zustand';

interface StateAuth {
  active: boolean;
}
export const useStateAuth = create<StateAuth>()((set) => ({
  active: false,
  setStateAuth: (active: boolean) => set({ active }),
}));
