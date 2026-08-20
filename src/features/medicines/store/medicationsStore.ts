import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Medication } from '../types';
import { zustandStorage } from '../../../shared/store/storage';
import { generateId } from '../../../shared/utils/dateUtils';

interface MedicationsState {
  medications: Medication[];
  addMedication: (medication: Medication) => void;
  toggleActive: (id: string) => void;
  removeMedication: (id: string) => void;
}

export const useMedicationsStore = create<MedicationsState>()(
  persist(
    (set) => ({
      medications: [],
      addMedication: (medication) => set((state) => ({ 
        medications: [...state.medications, { ...medication, id: generateId() }] 
      })),
      toggleActive: (id) => set((state) => ({
        medications: state.medications.map(m => 
          m.id === id ? { ...m, isActive: !m.isActive } : m
        )
      })),
      removeMedication: (id) => set((state) => ({
        medications: state.medications.filter(m => m.id !== id)
      }))
    }),
    {
      name: 'luna-medications-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
