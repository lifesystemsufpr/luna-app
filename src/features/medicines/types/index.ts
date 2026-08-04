export type MedicationCategory = 'Anticoncepcional' | 'Medicamento' | 'Suplemento' | 'Hormonal' | 'Vitamina';

export interface Medication {
  id: string;
  name: string;
  category: MedicationCategory;
  dosage: string; // Ex: '1 comprimido por dia'
  frequency: string; // Ex: 'Todos os dias', 'Seg/Qua/Sex'
  time: string; // Ex: '08:00'
  isActive: boolean;
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface NextReminder {
  medication: Medication;
  timeRemaining: string; // Ex: '2 horas'
  progress: number; // 0 a 100
}
