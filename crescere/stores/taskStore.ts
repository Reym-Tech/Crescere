// stores/taskStore.ts

import { create } from 'zustand';
import type { Task } from '../types/Task';
import type { Completion } from '../types/Completion';

interface TaskState {
  // Data
  tasks:           Task[];
  completions:     Completion[];
  selectedDate:    string;       // YYYY-MM-DD

  // Loading / error
  isLoading:       boolean;
  error:           string | null;

  // Actions
  setTasks:        (tasks: Task[]) => void;
  setCompletions:  (completions: Completion[]) => void;
  setSelectedDate: (date: string) => void;
  addTask:         (task: Task) => void;
  updateTask:      (updated: Task) => void;
  removeTask:      (id: number) => void;
  addCompletion:   (completion: Completion) => void;
  removeCompletion:(taskId: number, date: string) => void;
  setLoading:      (isLoading: boolean) => void;
  setError:        (error: string | null) => void;
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks:        [],
  completions:  [],
  selectedDate: todayISO(),
  isLoading:    false,
  error:        null,

  setTasks: (tasks) =>
    set({ tasks }),

  setCompletions: (completions) =>
    set({ completions }),

  setSelectedDate: (date) =>
    set({ selectedDate: date }),

  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, task] })),

  updateTask: (updated) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === updated.id ? updated : t)),
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks:       state.tasks.filter((t) => t.id !== id),
      completions: state.completions.filter((c) => c.taskId !== id),
    })),

  addCompletion: (completion) =>
    set((state) => ({
      completions: [...state.completions, completion],
    })),

  removeCompletion: (taskId, date) =>
    set((state) => ({
      completions: state.completions.filter(
        (c) => !(c.taskId === taskId && c.date === date)
      ),
    })),

  setLoading: (isLoading) =>
    set({ isLoading }),

  setError: (error) =>
    set({ error }),
}));

// ── Selectors ────────────────────────────────────────────────────────────────

export function selectCompletedIds(completions: Completion[]): Set<number> {
  return new Set(completions.map((c) => c.taskId));
}

export function selectDailyProgress(
  tasks: Task[],
  completions: Completion[]
): { completed: number; total: number; ratio: number } {
  const total     = tasks.length;
  const completed = completions.length;
  const ratio     = total === 0 ? 0 : completed / total;
  return { completed, total, ratio };
}
