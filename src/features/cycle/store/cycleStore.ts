import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '../../../shared/store/storage';
import { MenstrualPeriod } from '../../../shared/types/models';
import { generateId, formatDate } from '../../../shared/utils/dateUtils';

interface CycleState {
  periods: MenstrualPeriod[];
  addPeriod: (period: MenstrualPeriod) => void;
  startPeriod: (date: string, flow?: any, notes?: string) => void;
  finishPeriod: (id: string, endDate: string) => void;
  updatePeriod: (id: string, data: Partial<MenstrualPeriod>) => void;
  deletePeriod: (id: string) => void;
  getCurrentPeriod: () => MenstrualPeriod | undefined;
}

export const useCycleStore = create<CycleState>()(
  persist(
    (set, get) => ({
      periods: [],

      addPeriod: (period) => set((state) => {
        if (state.periods.some(p => p.id === period.id || p.startDate === period.startDate)) {
          return state;
        }
        const newPeriods = [...state.periods, period].sort((a, b) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        return { periods: newPeriods };
      }),

      startPeriod: (date, flow, notes) => set((state) => {
        // Prevent duplicate for same start date
        if (state.periods.some(p => p.startDate === date)) {
          return state;
        }

        const newPeriod: MenstrualPeriod = {
          id: generateId(),
          startDate: date,
          flow,
          notes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // Add and sort descending
        const newPeriods = [...state.periods, newPeriod].sort((a, b) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        
        return { periods: newPeriods };
      }),

      finishPeriod: (id, endDate) => set((state) => {
        const newPeriods = state.periods.map(p => {
          if (p.id === id) {
            // Check if end date >= start date
            if (new Date(endDate) >= new Date(p.startDate)) {
              return { ...p, endDate, updatedAt: new Date().toISOString() };
            }
          }
          return p;
        });
        return { periods: newPeriods };
      }),

      updatePeriod: (id, data) => set((state) => ({
        periods: state.periods.map(p => 
          p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
        )
      })),

      deletePeriod: (id) => set((state) => ({
        periods: state.periods.filter(p => p.id !== id)
      })),

      getCurrentPeriod: () => {
        const { periods } = get();
        // Return the most recent period if it hasn't ended yet
        const latest = periods[0];
        if (latest && !latest.endDate) {
          return latest;
        }
        return undefined;
      }
    }),
    {
      name: 'luna-cycle-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
