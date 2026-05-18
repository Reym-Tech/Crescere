// models/SummaryRepository.ts

import { getDatabase } from './database';
import type { MonthlySummary, UpsertMonthlySummaryInput } from '../types/Summary';

function rowToSummary(row: Record<string, unknown>): MonthlySummary {
  return {
    id:             row.id as number,
    month:          row.month as string,
    totalTasks:     row.total_tasks as number,
    completedTasks: row.completed_tasks as number,
    completionRate: row.completion_rate as number,
    averageMood:    row.average_mood as number | null,
    notes:          row.notes as string | null,
  };
}

export async function getSummaryForMonth(month: string): Promise<MonthlySummary | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<Record<string, unknown>>(
    `SELECT * FROM monthly_summaries WHERE month = ?`,
    [month]
  );
  return row ? rowToSummary(row) : null;
}

export async function upsertSummary(input: UpsertMonthlySummaryInput): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO monthly_summaries
       (month, total_tasks, completed_tasks, completion_rate, average_mood, notes)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(month) DO UPDATE SET
       total_tasks     = excluded.total_tasks,
       completed_tasks = excluded.completed_tasks,
       completion_rate = excluded.completion_rate,
       average_mood    = excluded.average_mood,
       notes           = excluded.notes`,
    [
      input.month,
      input.totalTasks,
      input.completedTasks,
      input.completionRate,
      input.averageMood ?? null,
      input.notes ?? null,
    ]
  );
}

export async function getAllSummaries(): Promise<MonthlySummary[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM monthly_summaries ORDER BY month ASC`
  );
  return rows.map(rowToSummary);
}
