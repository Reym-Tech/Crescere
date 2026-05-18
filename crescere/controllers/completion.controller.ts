// controllers/completion.controller.ts

import {
  getCompletionsByDate,
  createCompletion,
  deleteCompletion,
} from '../models/CompletionRepository';
import { useTaskStore } from '../stores/taskStore';

/**
 * Loads completions for a given date into the store.
 */
export async function loadCompletionsForDate(date: string): Promise<void> {
  const { setCompletions, setError } = useTaskStore.getState();
  setError(null);
  try {
    const completions = await getCompletionsByDate(date);
    setCompletions(completions);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load completions.');
  }
}

/**
 * Marks a task as complete for a given date.
 * No-op if already completed.
 */
export async function completeTask(taskId: number, date: string): Promise<void> {
  const { completions, addCompletion, setError } = useTaskStore.getState();
  const alreadyDone = completions.some(
    (c) => c.taskId === taskId && c.date === date
  );
  if (alreadyDone) return;

  setError(null);
  try {
    const completion = await createCompletion({ taskId, date });
    addCompletion(completion);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to complete task.');
  }
}

/**
 * Undoes a task completion for a given date.
 */
export async function uncompleteTask(taskId: number, date: string): Promise<void> {
  const { removeCompletion, setError } = useTaskStore.getState();
  setError(null);
  try {
    await deleteCompletion(taskId, date);
    removeCompletion(taskId, date);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to undo completion.');
  }
}
