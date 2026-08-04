import { useState, useEffect } from 'react';
import { DashboardData } from '../types';

// Mock hook para prover os dados para a tela
export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento do AsyncStorage/Zustand
    const loadData = async () => {
      setTimeout(() => {
        setData({
          user: { name: 'Ana' },
          cycle: {
            phase: 'Fase Folicular',
            dayOfCycle: 8,
            daysUntilNextPeriod: 19,
          },
          mood: 'Feliz',
          energy: 'Alta',
          hydration: {
            current: 1.8,
            goal: 2.5,
          }
        });
        setLoading(false);
      }, 500);
    };
    
    loadData();
  }, []);

  return { data, loading };
};
