export type DayState = 'normal' | 'today' | 'menstruation' | 'predicted' | 'fertile' | 'selected' | 'empty';

export interface CalendarDay {
  id: string;
  date: Date;
  dayNumber: number | null;
  state: DayState[]; // Um dia pode ser 'fertile' e 'today' ao mesmo tempo, mas vamos simplificar para prioridade ou lista
  isCurrentMonth: boolean;
}

export interface Symptom {
  id: string;
  name: string;
}

export interface Medication {
  id: string;
  name: string;
}

export interface DayLog {
  id: string;
  date: string; // ISO string YYYY-MM-DD
  cycleDayNumber?: number;
  flow?: 'Leve' | 'Médio' | 'Intenso' | 'Muito Intenso';
  mood?: string;
  energy?: string;
  symptoms: Symptom[];
  medications: Medication[];
}

export interface CycleData {
  lastPeriodStart: string; // YYYY-MM-DD
  cycleLength: number; // ex: 28
  periodLength: number; // ex: 5
}
