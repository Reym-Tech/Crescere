// models/TaskRepository.ts

import { getDatabase } from './database';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/Task';

function rowToTask(row: Record<string, unknown>): Task {
  return {
    id:            row.id as number,
    title:         row.title as string,
    description:   row.description as string | null,
    priority:      row.priority as Task['priority'],
    orderIndex:    row.order_index as number,
    scheduledDate: row.scheduled_date as string,
    createdAt:     row.created_at as string,
  };
}

export async function getTasksByDate(date: string): Promise<Task[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM tasks WHERE scheduled_date = ? ORDER BY order_index ASC`,
    [date]
  );
  return rows.map(rowToTask);
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const db = await getDatabase();
  const result = await db.runAsync(
    `INSERT INTO tasks (title, description, priority, order_index, scheduled_date)
     VALUES (?, ?, ?, ?, ?)`,
    [
      input.title,
      input.description ?? null,
      input.priority ?? 'medium',
      input.orderIndex ?? 0,
      input.scheduledDate,
    ]
  );
  const row = await db.getFirstAsync<Record<string, unknown>>(
    `SELECT * FROM tasks WHERE id = ?`,
    [result.lastInsertRowId]
  );
  return rowToTask(row!);
}

export async function updateTask(input: UpdateTaskInput): Promise<void> {
  const db = await getDatabase();
  const fields: string[] = [];
  const values: unknown[] = [];

  if (input.title !== undefined)         { fields.push('title = ?');          values.push(input.title); }
  if (input.description !== undefined)   { fields.push('description = ?');    values.push(input.description); }
  if (input.priority !== undefined)      { fields.push('priority = ?');       values.push(input.priority); }
  if (input.orderIndex !== undefined)    { fields.push('order_index = ?');    values.push(input.orderIndex); }
  if (input.scheduledDate !== undefined) { fields.push('scheduled_date = ?'); values.push(input.scheduledDate); }

  if (fields.length === 0) return;

  values.push(input.id);
  await db.runAsync(
    `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`,
    values as SQLiteBindValue[]
  );
}

export async function deleteTask(id: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM tasks WHERE id = ?`, [id]);
}
