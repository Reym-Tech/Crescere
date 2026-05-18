// components/ui/Typography.tsx

import React from 'react';
import { Text, type TextProps, type StyleProp, type TextStyle } from 'react-native';
import { useTheme, type TextStyleKey } from '../../theme';

interface TypographyProps extends TextProps {
  variant?:  TextStyleKey;
  color?:    string;
  align?:    'left' | 'center' | 'right';
  style?:    StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export function Typography({
  variant  = 'bodyMd',
  color,
  align    = 'left',
  style,
  children,
  ...rest
}: TypographyProps) {
  const { textStyles, colors } = useTheme();

  return (
    <Text
      style={[
        textStyles[variant],
        {
          color:     color ?? colors.textPrimary,
          textAlign: align,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
