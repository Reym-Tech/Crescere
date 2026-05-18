// models/CompletionRepository.ts

import { getDatabase } from './database';
import type { Completion, CreateCompletionInput } from '../types/Completion';

function rowToCompletion(row: Record<string, unknown>): Completion {
  return {
    id:          row.id as number,
    taskId:      row.task_id as number,
    completedAt: row.completed_at as string,
    date:        row.date as string,
    note:        row.note as string | null,
  };
}

export async function getCompletionsByDate(date: string): Promise<Completion[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM completions WHERE date = ?`,
    [date]
  );
  return rows.map(rowToCompletion);
}

export async function createCompletion(input: CreateCompletionInput): Promise<Completion> {
  const db = await getDatabase();
  const result = await db.runAsync(
    `INSERT INTO completions (task_id, date, note) VALUES (?, ?, ?)`,
    [input.taskId, input.date, input.note ?? null]
  );
  const row = await db.getFirstAsync<Record<string, unknown>>(
    `SELECT * FROM completions WHERE id = ?`,
    [result.lastInsertRowId]
  );
  return rowToCompletion(row!);
}

export async function deleteCompletion(taskId: number, date: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `DELETE FROM completions WHERE task_id = ? AND date = ?`,
    [taskId, date]
  );
}

export async function getCompletionCountForRange(
  startDate: string,
  endDate: string
): Promise<number> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM completions WHERE date BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  return row?.count ?? 0;
}
