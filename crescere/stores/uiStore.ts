// stores/uiStore.ts

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemePreference = 'light' | 'dark' | 'system';

interface UIState {
  // Theme
  themePreference:    ThemePreference;
  setThemePreference: (pref: ThemePreference) => Promise<void>;

  // Focus mode (shake to activate)
  isFocusMode:        boolean;
  setFocusMode:       (active: boolean) => void;

  // Add task sheet
  isAddTaskOpen:      boolean;
  setAddTaskOpen:     (open: boolean) => void;

  // Hydration
  isHydrated:         boolean;
  hydrate:            () => Promise<void>;
}

const STORAGE_KEY_THEME = 'ui:themePreference';

export const useUIStore = create<UIState>((set) => ({
  themePreference: 'system',
  isFocusMode:     false,
  isAddTaskOpen:   false,
  isHydrated:      false,

  setThemePreference: async (pref) => {
    set({ themePreference: pref });
    try {
      await AsyncStorage.setItem(STORAGE_KEY_THEME, pref);
    } catch {
      // Persist failure is non-critical; in-memory value is still set
    }
  },

  setFocusMode: (active) =>
    set({ isFocusMode: active }),

  setAddTaskOpen: (open) =>
    set({ isAddTaskOpen: open }),

  hydrate: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY_THEME);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        set({ themePreference: stored, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch {
      set({ isHydrated: true });
    }
  },
}));
