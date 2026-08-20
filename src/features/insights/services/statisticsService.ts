import { MenstrualPeriod, SymptomRecord, MoodRecord, SymptomType } from '../../../shared/types/models';
import { cycleService } from '../../cycle/services/cycleService';
import { differenceInDays } from '../../../shared/utils/dateUtils';

export const statisticsService = {
  getCycleStats: (periods: MenstrualPeriod[]) => {
    return cycleService.getStats(periods);
  },

  getPredominantMood: (moods: MoodRecord[]) => {
    if (moods.length === 0) return null;
    
    const counts: Record<number, number> = {};
    let maxCount = 0;
    let predominant = 3; // neutral default

    moods.forEach(m => {
      counts[m.mood] = (counts[m.mood] || 0) + 1;
      if (counts[m.mood] > maxCount) {
        maxCount = counts[m.mood];
        predominant = m.mood;
      }
    });

    const moodMap: Record<number, { emoji: string; text: string }> = {
      1: { emoji: '😢', text: 'Muito Ruim' },
      2: { emoji: '🙁', text: 'Ruim' },
      3: { emoji: '😐', text: 'Neutro' },
      4: { emoji: '🙂', text: 'Bom' },
      5: { emoji: '😊', text: 'Muito Bom' },
    };

    return moodMap[predominant];
  },

  getFrequentSymptoms: (symptoms: SymptomRecord[]) => {
    const counts: Record<SymptomType, number> = {} as any;
    
    symptoms.forEach(record => {
      record.symptoms.forEach(s => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });

    const symptomLabels: Record<SymptomType, string> = {
      cramps: 'Cãibras',
      headache: 'Dor de cabeça',
      backache: 'Dor lombar',
      nausea: 'Náusea',
      bloating: 'Inchaço',
      breast_tenderness: 'Sensibilidade nos seios',
      acne: 'Acne',
      fatigue: 'Fadiga',
      appetite_changes: 'Alteração de apetite',
      dizziness: 'Tontura',
      other: 'Outros'
    };

    const sorted = Object.entries(counts)
      .map(([key, count]) => ({
        key: key as SymptomType,
        label: symptomLabels[key as SymptomType] || key,
        count: count as number
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3); // top 3

    return sorted;
  }
};
