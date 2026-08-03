import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';

interface SessionState {
  hasOnboarded: boolean;
  setHasOnboarded: (value: boolean) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      setHasOnboarded: (value) => set({ hasOnboarded: value }),
    }),
    {
      name: 'pressao-facil-storage-sessao',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
