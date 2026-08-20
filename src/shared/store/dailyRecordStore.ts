import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from './storage';
import { SymptomRecord, MoodRecord, EnergyRecord, HydrationRecord } from '../types/models';
import { generateId } from '../utils/dateUtils';

interface DailyRecordState {
  symptoms: SymptomRecord[];
  moods: MoodRecord[];
  energies: EnergyRecord[];
  hydrations: HydrationRecord[];
  hydrationGoal: number;

  // Symptoms
  addSymptom: (date: string, symptoms: any[], notes?: string) => void;
  getSymptomsByDate: (date: string) => SymptomRecord | undefined;

  // Mood
  addMood: (date: string, mood: any, notes?: string) => void;
  getMoodByDate: (date: string) => MoodRecord | undefined;

  // Energy
  addEnergy: (date: string, level: any, notes?: string) => void;
  getEnergyByDate: (date: string) => EnergyRecord | undefined;
  
  // Hydration
  addWater: (date: string, amountLiters: number) => void;
  setHydrationGoal: (goal: number) => void;
  getHydrationByDate: (date: string) => HydrationRecord | undefined;

  // Clear all
  clearAllRecords: () => void;
}

export const useDailyRecordStore = create<DailyRecordState>()(
  persist(
    (set, get) => ({
      symptoms: [],
      moods: [],
      energies: [],
      hydrations: [],
      hydrationGoal: 2.5,

      addSymptom: (date, newSymptoms, notes) => set((state) => {
        const existing = state.symptoms.find(s => s.date === date);
        if (existing) {
          return {
            symptoms: state.symptoms.map(s => 
              s.date === date 
                ? { ...s, symptoms: Array.from(new Set([...s.symptoms, ...newSymptoms])), notes: notes || s.notes }
                : s
            )
          };
        }
        return {
          symptoms: [...state.symptoms, { id: generateId(), date, symptoms: newSymptoms, notes, createdAt: new Date().toISOString() }]
        };
      }),

      getSymptomsByDate: (date) => {
        return get().symptoms.find(s => s.date === date);
      },

      addMood: (date, mood, notes) => set((state) => {
        const existing = state.moods.find(m => m.date === date);
        if (existing) {
          return {
            moods: state.moods.map(m => m.date === date ? { ...m, mood, notes: notes || m.notes } : m)
          };
        }
        return {
          moods: [...state.moods, { id: generateId(), date, mood, notes, createdAt: new Date().toISOString() }]
        };
      }),

      getMoodByDate: (date) => {
        return get().moods.find(m => m.date === date);
      },

      addEnergy: (date, level, notes) => set((state) => {
        const existing = state.energies.find(e => e.date === date);
        if (existing) {
          return {
            energies: state.energies.map(e => e.date === date ? { ...e, level, notes: notes || e.notes } : e)
          };
        }
        return {
          energies: [...state.energies, { id: generateId(), date, level, notes, createdAt: new Date().toISOString() }]
        };
      }),

      getEnergyByDate: (date) => {
        return get().energies.find(e => e.date === date);
      },

      addWater: (date, amountLiters) => set((state) => {
        const existing = state.hydrations.find(h => h.date === date);
        if (existing) {
          return {
            hydrations: state.hydrations.map(h => 
              h.date === date ? { ...h, amountLiters: parseFloat((h.amountLiters + amountLiters).toFixed(2)) } : h
            )
          };
        }
        return {
          hydrations: [...state.hydrations, { 
            id: generateId(), 
            date, 
            amountLiters: parseFloat(amountLiters.toFixed(2)), 
            goalLiters: state.hydrationGoal, 
            createdAt: new Date().toISOString() 
          }]
        };
      }),

      setHydrationGoal: (goal) => set((state) => {
        // Also update the goal for today if it exists
        const today = new Date().toISOString().split('T')[0]; // Safe as a fallback, but better to just use current local date if possible. We won't update today's record directly to keep it simple, just update the global goal.
        return { hydrationGoal: goal };
      }),

      getHydrationByDate: (date) => {
        return get().hydrations.find(h => h.date === date);
      },

      clearAllRecords: () => set({ symptoms: [], moods: [], energies: [], hydrations: [] })
    }),
    {
      name: 'luna-daily-records-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
