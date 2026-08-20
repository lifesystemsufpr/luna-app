import { create } from 'zustand';

interface CalendarState {
  selectedDate: string; // YYYY-MM-DD
  currentMonth: Date;
  setSelectedDate: (date: string) => void;
  setCurrentMonth: (date: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
}

const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: todayStr,
  currentMonth: currentMonthStart,
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
