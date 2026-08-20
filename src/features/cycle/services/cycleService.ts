import { MenstrualPeriod } from '../../../shared/types/models';
import { differenceInDays, addDays, parseISOLocal, isSameDay } from '../../../shared/utils/dateUtils';

const DEFAULT_CYCLE_LENGTH = 28;
const DEFAULT_PERIOD_LENGTH = 5;

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal' | 'unknown';

export interface CycleStats {
  averageCycleLength: number;
  averagePeriodLength: number;
  nextPeriodEstimate: Date | null;
  nextFertileWindow: { start: Date; end: Date } | null;
  ovulationEstimate: Date | null;
}

export const cycleService = {
  getStats(periods: MenstrualPeriod[]): CycleStats {
    if (periods.length === 0) {
      return {
        averageCycleLength: DEFAULT_CYCLE_LENGTH,
        averagePeriodLength: DEFAULT_PERIOD_LENGTH,
        nextPeriodEstimate: null,
        nextFertileWindow: null,
        ovulationEstimate: null
      };
    }

    // Sort ascending
    const sorted = [...periods].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    let totalCycleDays = 0;
    let totalPeriodDays = 0;
    let cyclesCount = 0;
    let periodsCount = 0;

    for (let i = 0; i < sorted.length; i++) {
      const p = sorted[i];
      if (p.endDate) {
        totalPeriodDays += differenceInDays(p.endDate, p.startDate) + 1;
        periodsCount++;
      }

      if (i < sorted.length - 1) {
        const nextP = sorted[i + 1];
        const cycleLength = differenceInDays(nextP.startDate, p.startDate);
        
        // Ignora ciclos irrealistas (usuária esqueceu de registrar por meses, ou registrou duplicado)
        if (cycleLength >= 15 && cycleLength <= 90) {
          totalCycleDays += cycleLength;
          cyclesCount++;
        }
      }
    }

    const averageCycleLength = cyclesCount > 0 ? Math.round(totalCycleDays / cyclesCount) : DEFAULT_CYCLE_LENGTH;
    const averagePeriodLength = periodsCount > 0 ? Math.round(totalPeriodDays / periodsCount) : DEFAULT_PERIOD_LENGTH;

    const lastPeriod = sorted[sorted.length - 1];
    const lastStartDate = parseISOLocal(lastPeriod.startDate);
    
    const nextPeriodEstimate = addDays(lastStartDate, averageCycleLength);
    // Ovulation is roughly 14 days before next period
    const ovulationEstimate = addDays(nextPeriodEstimate, -14);
    // Fertile window is typically 5 days before to 1 day after ovulation
    const nextFertileWindow = {
      start: addDays(ovulationEstimate, -5),
      end: addDays(ovulationEstimate, 1)
    };

    return {
      averageCycleLength,
      averagePeriodLength,
      nextPeriodEstimate,
      nextFertileWindow,
      ovulationEstimate
    };
  },

  getCyclePhase(date: Date | string, periods: MenstrualPeriod[]): CyclePhase {
    if (periods.length === 0) return 'unknown';

    const targetDate = typeof date === 'string' ? parseISOLocal(date) : date;
    const stats = this.getStats(periods);
    
    const sorted = [...periods].sort((a, b) => 
      new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
    const lastPeriod = sorted[0]; // Descennding, so 0 is latest
    const lastStartDate = parseISOLocal(lastPeriod.startDate);

    // If target date is before the first ever recorded period
    if (targetDate < parseISOLocal(sorted[sorted.length - 1].startDate)) {
      return 'unknown';
    }

    // Check if target is inside a recorded menstrual period
    for (const p of periods) {
      const start = parseISOLocal(p.startDate);
      const end = p.endDate ? parseISOLocal(p.endDate) : addDays(start, stats.averagePeriodLength - 1);
      if (targetDate >= start && targetDate <= end) {
        return 'menstrual';
      }
    }

    // Determine phase based on recent period
    const daysSinceLastPeriod = differenceInDays(targetDate, lastStartDate);
    
    if (daysSinceLastPeriod < 0) {
      // Logic for days between recorded periods can be added here, 
      // but for simplicity, if it's not a menstrual day and it's in the past:
      return 'unknown'; 
    }

    // Basic estimation
    const ovulationDay = stats.averageCycleLength - 14;
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 1;

    if (daysSinceLastPeriod >= fertileStart && daysSinceLastPeriod <= fertileEnd) {
      return 'ovulation';
    } else if (daysSinceLastPeriod < fertileStart) {
      return 'follicular';
    } else if (daysSinceLastPeriod <= stats.averageCycleLength) {
      return 'luteal';
    }

    // If it's been longer than the average cycle, we might be 'late' but essentially unknown or extending luteal.
    return 'luteal';
  }
};
