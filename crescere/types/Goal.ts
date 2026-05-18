// types/Goal.ts

export interface WeeklyGoal {
  id: number;
  weekStart: string; // YYYY-MM-DD (Monday)
  targetCount: number;
  label: string | null;
}

export interface CreateWeeklyGoalInput {
  weekStart: string;
  targetCount: number;
  label?: string;
}

export interface UpdateWeeklyGoalInput {
  id: number;
  targetCount?: number;
  label?: string;
}
