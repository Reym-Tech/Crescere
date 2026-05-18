// components/ui/Button.tsx

import React, { useCallback } from 'react';
import {
  Pressable,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Typography } from './Typography';
import { useTheme } from '../../theme';
import { hapticLight } from '../../utils/haptics';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label:      string;
  onPress:    () => void;
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  disabled?:  boolean;
  loading?:   boolean;
  fullWidth?: boolean;
  style?:     StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const SPRING = { damping: 15, stiffness: 180 };

export function Button({
  label,
  onPress,
  variant   = 'primary',
  size      = 'md',
  disabled  = false,
  loading   = false,
  fullWidth = false,
  style,
  labelStyle,
}: ButtonProps) {
  const { colors, spacing, borderRadius, borderWidth } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, SPRING);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING);
  }, [scale]);

  const handlePress = useCallback(async () => {
    if (disabled || loading) return;
    await hapticLight();
    onPress();
  }, [disabled, loading, onPress]);

  // ── Variant styles ────────────────────────────────────────────────────────
  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.primary,
      borderWidth:     0,
    },
    secondary: {
      backgroundColor: colors.surface,
      borderWidth:     borderWidth.base,
      borderColor:     colors.border,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth:     0,
    },
    danger: {
      backgroundColor: colors.danger,
      borderWidth:     0,
    },
  };

  const labelColors: Record<ButtonVariant, string> = {
    primary:   colors.textInverse,
    secondary: colors.textPrimary,
    ghost:     colors.primary,
    danger:    colors.textInverse,
  };

  // ── Size styles ───────────────────────────────────────────────────────────
  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    sm: { paddingVertical: spacing.xxs, paddingHorizontal: spacing.sm,  minHeight: 32 },
    md: { paddingVertical: spacing.xs,  paddingHorizontal: spacing.md,  minHeight: 44 },
    lg: { paddingVertical: spacing.sm,  paddingHorizontal: spacing.lg,  minHeight: 52 },
  };

  return (
    <Animated.View style={[animatedStyle, fullWidth && { width: '100%' }]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          {
            borderRadius:    borderRadius.md,
            alignItems:      'center',
            justifyContent:  'center',
            flexDirection:   'row',
            opacity:         disabled ? 0.4 : 1,
          },
          variantStyles[variant],
          sizeStyles[size],
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={labelColors[variant]}
          />
        ) : (
          <Typography
            variant="bodyMd"
            color={labelColors[variant]}
            style={[{ fontWeight: '500' }, labelStyle]}
          >
            {label}
          </Typography>
        )}
      </Pressable>
    </Animated.View>
  );
}
