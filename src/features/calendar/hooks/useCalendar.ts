import { useMemo } from 'react';
import { useCalendarStore } from '../store/calendarStore';
import { useCycleStore } from '../../cycle/store/cycleStore';
import { cycleService } from '../../cycle/services/cycleService';
import { addDays, parseISOLocal, differenceInDays, formatDate } from '../../../shared/utils/dateUtils';

export const useCalendar = () => {
  const { currentMonth, selectedDate, nextMonth, prevMonth, setSelectedDate } = useCalendarStore();
  const periods = useCycleStore(state => state.periods);

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get stats from cycle service
    const stats = cycleService.getStats(periods);
    
    // Gather exact menstruation days from recorded periods
    const menstruationDays = new Set<string>();
    periods.forEach(p => {
      const start = parseISOLocal(p.startDate);
      // If end date is missing, assume average length
      const end = p.endDate ? parseISOLocal(p.endDate) : addDays(start, stats.averagePeriodLength - 1);
      const diff = differenceInDays(end, start);
      
      for (let i = 0; i <= diff; i++) {
        const d = addDays(start, i);
        const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        menstruationDays.add(dateStr);
      }
    });

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Gather predicted and fertile days
    const predictedDays = new Set<string>();
    const fertileDays = new Set<string>();
    
    if (stats.nextPeriodEstimate) {
      let currentEstimate = new Date(stats.nextPeriodEstimate);
      let safetyCount = 0;
      
      // Projetar as previsões até passar do mês que está sendo visualizado
      while (currentEstimate <= lastDayOfMonth && safetyCount < 48) {
        // Previsão de menstruação
        for (let i = 0; i < stats.averagePeriodLength; i++) {
          const d = addDays(currentEstimate, i);
          const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          predictedDays.add(dateStr);
        }

        // Previsão de dias férteis (ovulação costuma ser 14 dias ANTES da próxima menstruação)
        // Portanto a ovulação DAQUELA menstruação é 14 dias ANTES dela.
        const ovulationEstimate = addDays(currentEstimate, -14);
        const fertileStart = addDays(ovulationEstimate, -5);
        const fertileEnd = addDays(ovulationEstimate, 1);
        
        const fertileDiff = differenceInDays(fertileEnd, fertileStart);
        for (let i = 0; i <= fertileDiff; i++) {
          const d = addDays(fertileStart, i);
          const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
          fertileDays.add(dateStr);
        }

        // Avançar para o próximo ciclo
        currentEstimate = addDays(currentEstimate, stats.averageCycleLength);
        safetyCount++;
      }
    }

    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();
    
    const grid = [];
    let dayCounter = 1;
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    for (let row = 0; row < 6; row++) {
      const week = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < startingDayOfWeek) {
          const dayNum = prevMonthLastDay - (startingDayOfWeek - 1) + col;
          week.push({ id: `prev-${dayNum}`, date: new Date(year, month - 1, dayNum), dayNumber: dayNum, isCurrentMonth: false, type: 'normal' });
        } else if (dayCounter > daysInMonth) {
          const dayNum = dayCounter - daysInMonth;
          week.push({ id: `next-${dayNum}`, date: new Date(year, month + 1, dayNum), dayNumber: dayNum, isCurrentMonth: false, type: 'normal' });
          dayCounter++;
        } else {
          const currentDayDate = new Date(year, month, dayCounter);
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`;
          
          let type = 'normal';
          const isToday = dateString === formatDate(new Date(), 'YYYY-MM-DD');
          const isSelected = dateString === selectedDate;
          
          if (menstruationDays.has(dateString)) {
              type = isSelected ? 'menstruation-selected' : 'menstruation';
          } else if (isSelected) {
              type = 'selected';
          } else if (predictedDays.has(dateString)) {
              type = 'predicted';
          } else if (fertileDays.has(dateString)) {
              type = 'fertile';
          } else if (isToday) {
              type = 'today';
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
      if (dayCounter > daysInMonth && row >= 4) break;
    }
    
    return grid;
  }, [currentMonth, selectedDate, periods]);

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
