import { create } from 'zustand';

interface CalendarState {
  selectedDate: string; // YYYY-MM-DD
  currentMonth: Date;
  setSelectedDate: (date: string) => void;
  setCurrentMonth: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: new Date('2024-06-08').toISOString().split('T')[0], // Usando a data do mockup para ficar fiel à imagem
  currentMonth: new Date('2024-06-01'), // Mês base do mockup
  setSelectedDate: (date) => set({ selectedDate: date }),
  setCurrentMonth: (date) => set({ currentMonth: date }),
  nextMonth: () => set((state) => {
    const next = new Date(state.currentMonth);
    next.setMonth(next.getMonth() + 1);
    return { currentMonth: next };
  }),
  prevMonth: () => set((state) => {
    const prev = new Date(state.currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    return { currentMonth: prev };
  }),
}));
