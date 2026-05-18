// hooks/useProgress.ts

import { useTaskStore, selectDailyProgress } from '../stores/taskStore';

/**
 * Returns the daily progress ratio, completed count, and total count
 * derived from the current store state. No async calls needed –
 * data is already loaded by useDailyTasks.
 */
export function useProgress() {
  const tasks       = useTaskStore((s) => s.tasks);
  const completions = useTaskStore((s) => s.completions);
  return selectDailyProgress(tasks, completions);
}
