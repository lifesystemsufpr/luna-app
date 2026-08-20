import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';

interface SessionState {
  hasOnboarded: boolean;
  userName: string | null;
  birthDate: string | null;
  setHasOnboarded: (value: boolean) => void;
  setUserData: (name: string, birthDate: string) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      userName: null,
      birthDate: null,
      setHasOnboarded: (value) => set({ hasOnboarded: value }),
      setUserData: (name, birthDate) => set({ userName: name, birthDate }),
    }),
    {
      name: 'luna-storage-session',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
