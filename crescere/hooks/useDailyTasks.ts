// hooks/useDailyTasks.ts

import { useEffect, useCallback } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { loadTasksForDate } from '../controllers/task.controller';
import { loadCompletionsForDate } from '../controllers/completion.controller';

/**
 * Loads tasks and completions for the selected date.
 * Re-fetches whenever selectedDate changes.
 */
export function useDailyTasks() {
  const selectedDate = useTaskStore((s) => s.selectedDate);
  const tasks        = useTaskStore((s) => s.tasks);
  const completions  = useTaskStore((s) => s.completions);
  const isLoading    = useTaskStore((s) => s.isLoading);
  const error        = useTaskStore((s) => s.error);

  const refresh = useCallback(async () => {
    await Promise.all([
      loadTasksForDate(selectedDate),
      loadCompletionsForDate(selectedDate),
    ]);
  }, [selectedDate]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { tasks, completions, isLoading, error, refresh, selectedDate };
}
