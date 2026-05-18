// types/Task.ts

export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskStatus = 'pending' | 'completed' | 'skipped';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: TaskPriority;
  orderIndex: number;
  createdAt: string; // ISO 8601
  scheduledDate: string; // YYYY-MM-DD
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  scheduledDate: string;
  orderIndex?: number;
}

export interface UpdateTaskInput {
  id: number;
  title?: string;
  description?: string;
  priority?: TaskPriority;
  orderIndex?: number;
  scheduledDate?: string;
}
