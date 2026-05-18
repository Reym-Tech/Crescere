// hooks/useWeeklyGoals.ts

import { useState, useEffect, useCallback } from 'react';
import { getGoalForWeek, createGoal } from '../models/GoalRepository';
import { getWeekStart } from '../utils/dateHelpers';
import { useTaskStore } from '../stores/taskStore';
import type { WeeklyGoal } from '../types/Goal';

const DEFAULT_TARGET = 5;

/**
 * Loads (or creates) the weekly goal for the currently selected date's week.
 */
export function useWeeklyGoals() {
  const selectedDate = useTaskStore((s) => s.selectedDate);
  const weekStart    = getWeekStart(selectedDate);

  const [goal, setGoal]       = useState<WeeklyGoal | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let existing = await getGoalForWeek(weekStart);
      if (!existing) {
        existing = await createGoal({ weekStart, targetCount: DEFAULT_TARGET });
      }
      setGoal(existing);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load goal.');
    } finally {
      setLoading(false);
    }
  }, [weekStart]);

  useEffect(() => {
    load();
  }, [load]);

  return { goal, isLoading, error, reload: load };
}
