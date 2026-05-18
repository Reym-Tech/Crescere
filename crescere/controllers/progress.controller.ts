// controllers/progress.controller.ts

import { getTasksByDate } from '../models/TaskRepository';
import { getCompletionsByDate, getCompletionCountForRange } from '../models/CompletionRepository';
import { getWeekDays } from '../utils/dateHelpers';

export interface DayProgress {
  date:      string;
  total:     number;
  completed: number;
  ratio:     number;
}

/**
 * Returns progress (total / completed / ratio) for a single day.
 */
export async function getDayProgress(date: string): Promise<DayProgress> {
  const [tasks, completions] = await Promise.all([
    getTasksByDate(date),
    getCompletionsByDate(date),
  ]);
  const total     = tasks.length;
  const completed = completions.length;
  return { date, total, completed, ratio: total === 0 ? 0 : completed / total };
}

/**
 * Returns progress for every day in the week containing the given date.
 */
export async function getWeekProgress(dateString: string): Promise<DayProgress[]> {
  const days = getWeekDays(dateString);
  return Promise.all(days.map(getDayProgress));
}

/**
 * Returns total completions for a date range (inclusive).
 */
export async function getRangeCompletionCount(
  startDate: string,
  endDate: string
): Promise<number> {
  return getCompletionCountForRange(startDate, endDate);
}
