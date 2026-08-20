export interface MenstrualPeriod {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD
  flow?: FlowIntensity;
  notes?: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export type FlowIntensity = 'light' | 'medium' | 'heavy' | 'very_heavy';

export interface SymptomRecord {
  id: string;
  date: string; // YYYY-MM-DD
  symptoms: SymptomType[];
  notes?: string;
  createdAt: string; // ISO
}

export type SymptomType = 
  | 'cramps'
  | 'headache'
  | 'backache'
  | 'nausea'
  | 'bloating'
  | 'breast_tenderness'
  | 'acne'
  | 'fatigue'
  | 'appetite_changes'
  | 'dizziness'
  | 'other';

export interface MoodRecord {
  id: string;
  date: string; // YYYY-MM-DD
  mood: MoodLevel; // 1 to 5
  notes?: string;
  createdAt: string; // ISO
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface EnergyRecord {
  id: string;
  date: string; // YYYY-MM-DD
  level: EnergyLevel; // 1 to 5
  notes?: string;
  createdAt: string; // ISO
}

export type EnergyLevel = 1 | 2 | 3 | 4 | 5;

export interface Medication {
  id: string;
  name: string;
  dosage?: string;
  frequency?: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD
  notes?: string;
  active: boolean;
}

export interface MedicationLog {
  id: string;
  medicationId: string;
  dateTime: string; // ISO string
  taken: boolean;
  notes?: string;
}

export interface HydrationRecord {
  id: string;
  date: string; // YYYY-MM-DD
  amountLiters: number;
  goalLiters: number;
  createdAt: string; // ISO
}
