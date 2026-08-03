import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '../../../shared/store/storage';

interface DashboardState {
  hasSeenWelcome: boolean;
  setHasSeenWelcome: (value: boolean) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      hasSeenWelcome: false,
      setHasSeenWelcome: (value) => set({ hasSeenWelcome: value }),
    }),
    {
      name: 'pressao-facil-storage-dashboard',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
