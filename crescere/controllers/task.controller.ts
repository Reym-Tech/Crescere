// controllers/task.controller.ts

import {
  getTasksByDate,
  createTask,
  updateTask,
  deleteTask,
} from '../models/TaskRepository';
import { useTaskStore } from '../stores/taskStore';
import type { CreateTaskInput, UpdateTaskInput } from '../types/Task';

/**
 * Loads all tasks for a given date into the store.
 */
export async function loadTasksForDate(date: string): Promise<void> {
  const { setTasks, setLoading, setError } = useTaskStore.getState();
  setLoading(true);
  setError(null);
  try {
    const tasks = await getTasksByDate(date);
    setTasks(tasks);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load tasks.');
  } finally {
    setLoading(false);
  }
}

/**
 * Creates a new task and appends it to the store.
 */
export async function addTask(input: CreateTaskInput): Promise<void> {
  const { addTask: storeAdd, setError } = useTaskStore.getState();
  setError(null);
  try {
    const task = await createTask(input);
    storeAdd(task);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to create task.');
  }
}

/**
 * Updates an existing task in DB and store.
 */
export async function editTask(input: UpdateTaskInput): Promise<void> {
  const { tasks, updateTask: storeUpdate, setError } = useTaskStore.getState();
  setError(null);
  try {
    await updateTask(input);
    const existing = tasks.find((t) => t.id === input.id);
    if (existing) {
      storeUpdate({ ...existing, ...input } as typeof existing);
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to update task.');
  }
}

/**
 * Deletes a task from DB and store.
 */
export async function removeTask(id: number): Promise<void> {
  const { removeTask: storeRemove, setError } = useTaskStore.getState();
  setError(null);
  try {
    await deleteTask(id);
    storeRemove(id);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to delete task.');
  }
}
