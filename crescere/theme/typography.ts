// theme/typography.ts

import { Platform } from 'react-native';

// Elegant font stack
export const fontFamily = {
  primary:  'GoogleSans',
  display:  'GoogleSans',
  mono:     'AnonymousPro',
  // System fallbacks for before fonts load
  systemSans: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
  systemMono: Platform.select({ ios: 'Courier New', android: 'monospace', default: 'monospace' }),
} as const;

export const fontWeight = {
  thin:       '100',
  extraLight: '200',
  light:      '300',
  regular:    '400',
  medium:     '500',
  semiBold:   '600',
} as const;

// Scale: 14 / 16 / 18 / 24 / 32 / 40
export const fontSize = {
  xs:   14,
  sm:   16,
  md:   18,
  lg:   24,
  xl:   32,
  xxl:  40,
} as const;

export const lineHeight = {
  xs:   20,
  sm:   24,
  md:   28,
  lg:   32,
  xl:   40,
  xxl:  48,
} as const;

export const letterSpacing = {
  tight:   -0.5,
  normal:   0,
  wide:     0.5,
  wider:    1,
  widest:   2,
} as const;

// Pre-composed text styles for direct use in components
export const textStyles = {
  h1: {
    fontFamily:    fontFamily.display,
    fontSize:      fontSize.xxl,
    lineHeight:    lineHeight.xxl,
    fontWeight:    fontWeight.semiBold,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily:    fontFamily.display,
    fontSize:      fontSize.xl,
    lineHeight:    lineHeight.xl,
    fontWeight:    fontWeight.semiBold,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily:    fontFamily.primary,
    fontSize:      fontSize.lg,
    lineHeight:    lineHeight.lg,
    fontWeight:    fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
  bodyLg: {
    fontFamily:    fontFamily.primary,
    fontSize:      fontSize.md,
    lineHeight:    lineHeight.md,
    fontWeight:    fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  bodyMd: {
    fontFamily:    fontFamily.primary,
    fontSize:      fontSize.sm,
    lineHeight:    lineHeight.sm,
    fontWeight:    fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  bodySm: {
    fontFamily:    fontFamily.primary,
    fontSize:      fontSize.xs,
    lineHeight:    lineHeight.xs,
    fontWeight:    fontWeight.regular,
    letterSpacing: letterSpacing.normal,
  },
  labelCaps: {
    fontFamily:    fontFamily.mono,
    fontSize:      fontSize.xs,
    lineHeight:    lineHeight.xs,
    fontWeight:    fontWeight.medium,
    letterSpacing: letterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily:    fontFamily.primary,
    fontSize:      fontSize.xs,
    lineHeight:    lineHeight.xs,
    fontWeight:    fontWeight.light,
    letterSpacing: letterSpacing.normal,
  },
} as const;

export type TextStyleKey = keyof typeof textStyles;
