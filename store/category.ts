import { create } from 'zustand';

interface StateCategory {
  activeId: string;
  setActiveId: (activeId: string) => void;
}

export const useCategoryStore = create<StateCategory>()((set) => ({
  activeId: '1',
  setActiveId: (activeId: string) => set({ activeId }),
}));
