// components/ui/Surface.tsx

import React from 'react';
import { View, type ViewProps, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

interface SurfaceProps extends ViewProps {
  elevated?: boolean;
  sunken?:   boolean;
  style?:    StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Surface({
  elevated = false,
  sunken   = false,
  style,
  children,
  ...rest
}: SurfaceProps) {
  const { colors, borderRadius, shadow } = useTheme();

  const backgroundColor = sunken
    ? colors.surfaceSunken
    : elevated
    ? colors.surfaceElevated
    : colors.surface;

  const elevation = elevated ? shadow.md : shadow.none;

  return (
    <View
      style={[
        {
          backgroundColor,
          borderRadius: borderRadius.lg,
          ...elevation,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
