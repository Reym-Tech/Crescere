// theme/index.ts

import { useColorScheme } from 'react-native';
import { lightColors, darkColors, type ColorTokens } from './colors';
import { spacing, borderRadius, borderWidth, shadow } from './spacing';
import { textStyles, fontFamily, fontWeight, fontSize, lineHeight } from './typography';

export * from './colors';
export * from './spacing';
export * from './typography';

export interface Theme {
  colors:       ColorTokens;
  spacing:      typeof spacing;
  borderRadius: typeof borderRadius;
  borderWidth:  typeof borderWidth;
  shadow:       typeof shadow;
  textStyles:   typeof textStyles;
  fontFamily:   typeof fontFamily;
  fontWeight:   typeof fontWeight;
  fontSize:     typeof fontSize;
  lineHeight:   typeof lineHeight;
  isDark:       boolean;
}

function buildTheme(isDark: boolean): Theme {
  return {
    colors:       isDark ? darkColors : lightColors,
    spacing,
    borderRadius,
    borderWidth,
    shadow,
    textStyles,
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight,
    isDark,
  };
}

export const lightTheme = buildTheme(false);
export const darkTheme  = buildTheme(true);

/**
 * Returns the correct theme based on the system colour scheme.
 * Use inside any component or hook.
 */
export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
