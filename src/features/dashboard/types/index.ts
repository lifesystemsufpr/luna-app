export interface User {
  name: string;
  avatarUrl?: string;
}

export interface CycleData {
  phase: string;
  dayOfCycle: number;
  daysUntilNextPeriod: number;
}

export interface DashboardData {
  user: User;
  cycle: CycleData;
  mood: string;
  energy: string;
  hydration: {
    current: number;
    goal: number;
  };
}
