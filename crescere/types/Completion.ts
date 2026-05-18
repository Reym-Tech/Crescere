// types/Completion.ts

export interface Completion {
  id: number;
  taskId: number;
  completedAt: string; // ISO 8601
  date: string;        // YYYY-MM-DD
  note: string | null;
}

export interface CreateCompletionInput {
  taskId: number;
  date: string;
  note?: string;
}
