// hooks/useTaskComplete.ts

import { useCallback } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { completeTask, uncompleteTask } from '../controllers/completion.controller';
import { hapticSuccess, hapticLight } from '../utils/haptics';

/**
 * Returns a toggle function and a helper to check if a task is done
 * for the currently selected date.
 */
export function useTaskComplete() {
  const selectedDate = useTaskStore((s) => s.selectedDate);
  const completions  = useTaskStore((s) => s.completions);

  const isCompleted = useCallback(
    (taskId: number): boolean =>
      completions.some((c) => c.taskId === taskId && c.date === selectedDate),
    [completions, selectedDate]
  );

  const toggle = useCallback(
    async (taskId: number): Promise<void> => {
      if (isCompleted(taskId)) {
        await uncompleteTask(taskId, selectedDate);
        await hapticLight();
      } else {
        await completeTask(taskId, selectedDate);
        await hapticSuccess();
      }
    },
    [isCompleted, selectedDate]
  );

  return { toggle, isCompleted };
}
