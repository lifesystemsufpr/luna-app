import { useMemo } from 'react';
import { useCalendarStore } from '../store/calendarStore';
import { cyclePredictionService } from '../services/cyclePrediction';

export const useCalendar = () => {
  const { currentMonth, selectedDate, nextMonth, prevMonth, setSelectedDate } = useCalendarStore();

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Predições mockadas
    const predictions = cyclePredictionService.getPredictions(currentMonth, {} as any);
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
    
    const grid = [];
    let dayCounter = 1;
    
    // Obter dias do mês anterior para preencher a primeira linha
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    for (let row = 0; row < 6; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < startingDayOfWeek) {
          // Dias do mês anterior
          const dayNum = prevMonthLastDay - (startingDayOfWeek - 1) + col;
          week.push({ id: `prev-${dayNum}`, date: new Date(year, month - 1, dayNum), dayNumber: dayNum, isCurrentMonth: false, type: 'normal' });
        } else if (dayCounter > daysInMonth) {
          // Dias do próximo mês
          const dayNum = dayCounter - daysInMonth;
          week.push({ id: `next-${dayNum}`, date: new Date(year, month + 1, dayNum), dayNumber: dayNum, isCurrentMonth: false, type: 'normal' });
          dayCounter++;
        } else {
          // Dias do mês atual
          const currentDayDate = new Date(year, month, dayCounter);
          // formata a data pra YYYY-MM-DD usando utc pra evitar problema de fuso
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`;
          
          let type = 'normal';
          
          if (dateString === '2024-06-08' && dateString === selectedDate) { // Simulando 'hoje' / 'selecionado' para o mockup
              type = 'selected';
          } else if (predictions.menstruationDays.includes(dateString)) {
              type = 'menstruation';
              if (dateString === selectedDate) type = 'menstruation-selected';
          } else if (predictions.predictedDays.includes(dateString)) {
              type = 'predicted';
          } else if (predictions.fertileDays.includes(dateString)) {
              type = 'fertile';
          } else if (dateString === selectedDate) {
              type = 'selected';
          }

          week.push({ 
            id: dateString, 
            date: currentDayDate, 
            dayNumber: dayCounter, 
            isCurrentMonth: true, 
            type 
          });
          dayCounter++;
        }
      }
      grid.push(week);
      if (dayCounter > daysInMonth && row >= 4) break; // Para não criar 6ª linha se não for necessária
    }
    
    return grid;
  }, [currentMonth, selectedDate]);

  return {
    currentMonth,
    selectedDate,
    nextMonth,
    prevMonth,
    setSelectedDate,
    onDayPress: setSelectedDate,
    calendarGrid: calendarData
  };
};
