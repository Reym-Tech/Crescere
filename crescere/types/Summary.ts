// types/Summary.ts

export interface MonthlySummary {
  id: number;
  month: string;           // YYYY-MM
  totalTasks: number;
  completedTasks: number;
  completionRate: number;  // 0.0 – 1.0
  averageMood: number | null;
  notes: string | null;
}

export interface UpsertMonthlySummaryInput {
  month: string;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  averageMood?: number;
  notes?: string;
}
