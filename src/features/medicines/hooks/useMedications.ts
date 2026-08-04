import { useMemo } from 'react';
import { useMedicationsStore } from '../store/medicationsStore';
import { reminderService } from '../services/reminderService';

export const useMedications = () => {
  const { medications, addMedication, toggleActive, removeMedication } = useMedicationsStore();

  const nextReminder = useMemo(() => {
    return reminderService.getNextReminder(medications);
  }, [medications]);

  return {
    medications,
    nextReminder,
    addMedication,
    toggleActive,
    removeMedication
  };
};
