// models/GoalRepository.ts

import { getDatabase } from './database';
import type { WeeklyGoal, CreateWeeklyGoalInput, UpdateWeeklyGoalInput } from '../types/Goal';

function rowToGoal(row: Record<string, unknown>): WeeklyGoal {
  return {
    id:          row.id as number,
    weekStart:   row.week_start as string,
    targetCount: row.target_count as number,
    label:       row.label as string | null,
  };
}

export async function getGoalForWeek(weekStart: string): Promise<WeeklyGoal | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<Record<string, unknown>>(
    `SELECT * FROM weekly_goals WHERE week_start = ?`,
    [weekStart]
  );
  return row ? rowToGoal(row) : null;
}

export async function createGoal(input: CreateWeeklyGoalInput): Promise<WeeklyGoal> {
  const db = await getDatabase();
  const result = await db.runAsync(
    `INSERT INTO weekly_goals (week_start, target_count, label) VALUES (?, ?, ?)`,
    [input.weekStart, input.targetCount, input.label ?? null]
  );
  const row = await db.getFirstAsync<Record<string, unknown>>(
    `SELECT * FROM weekly_goals WHERE id = ?`,
    [result.lastInsertRowId]
  );
  return rowToGoal(row!);
}

export async function updateGoal(input: UpdateWeeklyGoalInput): Promise<void> {
  const db = await getDatabase();
  const fields: string[] = [];
  const values: unknown[] = [];

  if (input.targetCount !== undefined) { fields.push('target_count = ?'); values.push(input.targetCount); }
  if (input.label !== undefined)       { fields.push('label = ?');        values.push(input.label); }

  if (fields.length === 0) return;

  values.push(input.id);
  await db.runAsync(
    `UPDATE weekly_goals SET ${fields.join(', ')} WHERE id = ?`,
    values as SQLiteBindValue[]
  );
}
