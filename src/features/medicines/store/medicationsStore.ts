import { create } from 'zustand';
import { Medication } from '../types';

interface MedicationsState {
  medications: Medication[];
  addMedication: (medication: Medication) => void;
  toggleActive: (id: string) => void;
  removeMedication: (id: string) => void;
}

const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Anticoncepcional',
    category: 'Anticoncepcional',
    dosage: '1 comprimido por dia',
    frequency: 'Diário',
    time: '08:00',
    isActive: true,
    startDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Suplemento',
    category: 'Suplemento',
    dosage: '2 gomas por dia',
    frequency: 'Seg/Qua/Sex',
    time: '12:00',
    isActive: true,
    startDate: '2024-06-01'
  }
];

export const useMedicationsStore = create<MedicationsState>((set) => ({
  medications: mockMedications,
  addMedication: (medication) => set((state) => ({ 
    medications: [...state.medications, medication] 
  })),
  toggleActive: (id) => set((state) => ({
    medications: state.medications.map(m => 
      m.id === id ? { ...m, isActive: !m.isActive } : m
    )
  })),
  removeMedication: (id) => set((state) => ({
    medications: state.medications.filter(m => m.id !== id)
  }))
}));
