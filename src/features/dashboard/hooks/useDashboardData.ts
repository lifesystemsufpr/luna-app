import { useState, useEffect, useMemo } from 'react';
import { useCycleStore } from '../../cycle/store/cycleStore';
import { useDailyRecordStore } from '../../../shared/store/dailyRecordStore';
import { useSessionStore } from '../../../shared/store/sessionStore';
import { cycleService } from '../../cycle/services/cycleService';
import { differenceInDays, formatDate } from '../../../shared/utils/dateUtils';
import { DashboardData } from '../types';

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);

  const periods = useCycleStore(state => state.periods);
  const moods = useDailyRecordStore(state => state.moods);
  const energies = useDailyRecordStore(state => state.energies);
  const symptoms = useDailyRecordStore(state => state.symptoms);
  const hydrations = useDailyRecordStore(state => state.hydrations);
  const hydrationGoal = useDailyRecordStore(state => state.hydrationGoal);
  const userName = useSessionStore(state => state.userName);

  const data: DashboardData | null = useMemo(() => {
    const today = new Date();
    const todayStr = formatDate(today, 'YYYY-MM-DD');
    
    // Cycle logic
    const stats = cycleService.getStats(periods);
    const phaseRaw = cycleService.getCyclePhase(today, periods);
    const phaseMap: Record<string, string> = {
      menstrual: 'Fase Menstrual',
      follicular: 'Fase Folicular',
      ovulation: 'Ovulação (Fértil)',
      luteal: 'Fase Lútea',
      unknown: 'Desconhecida'
    };
    const phase = phaseMap[phaseRaw] || 'Desconhecida';

    // Day of cycle
    let dayOfCycle = 1;
    const currentPeriod = useCycleStore.getState().getCurrentPeriod();
    if (currentPeriod) {
      dayOfCycle = differenceInDays(today, currentPeriod.startDate) + 1;
    } else if (periods.length > 0) {
      // Sort to get latest
      const sorted = [...periods].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      dayOfCycle = differenceInDays(today, sorted[0].startDate) + 1;
    }

    // Days until next period
    let daysUntilNextPeriod = 0;
    if (stats.nextPeriodEstimate) {
      daysUntilNextPeriod = differenceInDays(stats.nextPeriodEstimate, today);
    }

    // Today's records
    const todayMood = moods.find(m => m.date === todayStr);
    const todayEnergy = energies.find(e => e.date === todayStr);
    const todayHydration = hydrations.find(h => h.date === todayStr);
    
    // Simplistic mapping for display
    const moodMap: Record<number, string> = { 1: 'Muito Ruim', 2: 'Ruim', 3: 'Neutro', 4: 'Bom', 5: 'Muito Bom' };
    const energyMap: Record<number, string> = { 1: 'Muito Baixa', 2: 'Baixa', 3: 'Normal', 4: 'Alta', 5: 'Muito Alta' };

    return {
      user: { name: userName || 'Usuária' },
      cycle: {
        phase,
        dayOfCycle: Math.max(1, dayOfCycle),
        daysUntilNextPeriod: daysUntilNextPeriod, // Remove limite de 0 para tratar os atrasos
      },
      mood: todayMood ? moodMap[todayMood.mood] : 'Sem Registro',
      energy: todayEnergy ? energyMap[todayEnergy.level] : 'Sem Registro',
      hydration: {
        current: todayHydration ? todayHydration.amountLiters : 0,
        goal: hydrationGoal,
      }
    };
  }, [periods, moods, energies, symptoms, hydrations, hydrationGoal, userName]);

  useEffect(() => {
    // Simulate initial async storage load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
};
