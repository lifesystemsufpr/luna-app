import { Medication, NextReminder } from '../types';

export const reminderService = {
  getNextReminder: (medications: Medication[]): NextReminder | null => {
    const activeMeds = medications.filter(m => m.isActive);
    if (activeMeds.length === 0) return null;
    
    // Mock: Retorna o primeiro ativo como próximo
    return {
      medication: activeMeds[0],
      timeRemaining: '2 horas e 30 min',
      progress: 65,
    };
  }
};
