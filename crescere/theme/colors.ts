// theme/colors.ts

export const palette = {
  // Brand
  primary:   '#3B82F6',
  secondary: '#8B5CF6',

  // Semantic
  success:   '#16A34A',
  warning:   '#D97706',
  danger:    '#DC2626',

  // Neutral scale
  white:     '#FFFFFF',
  gray50:    '#F9FAFB',
  gray100:   '#F3F4F6',
  gray200:   '#E5E7EB',
  gray300:   '#D1D5DB',
  gray400:   '#9CA3AF',
  gray500:   '#6B7280',
  gray600:   '#4B5563',
  gray700:   '#374151',
  gray800:   '#1F2937',
  gray900:   '#111827',
  black:     '#000000',
} as const;

export const lightColors = {
  // Surface
  background:        palette.gray50,
  surface:           palette.white,
  surfaceElevated:   palette.white,
  surfaceSunken:     palette.gray100,

  // Text
  textPrimary:       palette.gray900,
  textSecondary:     palette.gray500,
  textDisabled:      palette.gray300,
  textInverse:       palette.white,

  // Border
  border:            palette.gray200,
  borderStrong:      palette.gray300,

  // Brand
  primary:           palette.primary,
  primaryMuted:      '#EFF6FF',
  secondary:         palette.secondary,
  secondaryMuted:    '#F5F3FF',

  // Semantic
  success:           palette.success,
  successMuted:      '#F0FDF4',
  warning:           palette.warning,
  warningMuted:      '#FFFBEB',
  danger:            palette.danger,
  dangerMuted:       '#FEF2F2',

  // Misc
  overlay:           'rgba(0,0,0,0.4)',
  shadow:            'rgba(0,0,0,0.08)',
} as const;

export const darkColors: typeof lightColors = {
  // Surface
  background:        palette.gray900,
  surface:           palette.gray800,
  surfaceElevated:   palette.gray700,
  surfaceSunken:     '#0D1117',

  // Text
  textPrimary:       palette.gray50,
  textSecondary:     palette.gray400,
  textDisabled:      palette.gray600,
  textInverse:       palette.gray900,

  // Border
  border:            palette.gray700,
  borderStrong:      palette.gray600,

  // Brand
  primary:           '#60A5FA',
  primaryMuted:      '#1E3A5F',
  secondary:         '#A78BFA',
  secondaryMuted:    '#2E1B5E',

  // Semantic
  success:           '#4ADE80',
  successMuted:      '#052E16',
  warning:           '#FCD34D',
  warningMuted:      '#451A03',
  danger:            '#F87171',
  dangerMuted:       '#450A0A',

  // Misc
  overlay:           'rgba(0,0,0,0.6)',
  shadow:            'rgba(0,0,0,0.3)',
} as const;

export type ColorTokens = typeof lightColors;
