// components/TaskCard.tsx

import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../theme';
import { Typography } from './ui/Typography';
import type { Task, TaskPriority } from '../types/Task';

interface TaskCardProps {
  task:        Task;
  isCompleted: boolean;
  onToggle:    (taskId: number) => void;
}

const SPRING = { damping: 18, stiffness: 180 };

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low:    '#16A34A',
  medium: '#D97706',
  high:   '#DC2626',
};

export function TaskCard({ task, isCompleted, onToggle }: TaskCardProps) {
  const { colors, spacing, borderRadius, borderWidth, shadow } = useTheme();

  const scale    = useSharedValue(1);
  const checked  = useSharedValue(isCompleted ? 1 : 0);

  // Sync animation when isCompleted prop changes
  React.useEffect(() => {
    checked.value = withTiming(isCompleted ? 1 : 0, { duration: 250 });
  }, [isCompleted]);

  const cardStyle = useAnimatedStyle(() => ({
    transform:  [{ scale: scale.value }],
    opacity:    withTiming(isCompleted ? 0.6 : 1, { duration: 250 }),
  }));

  const checkStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      checked.value,
      [0, 1],
      [colors.surfaceSunken, colors.primary]
    ),
    borderColor: interpolateColor(
      checked.value,
      [0, 1],
      [colors.border, colors.primary]
    ),
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, SPRING);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING);
  }, []);

  const handlePress = useCallback(() => {
    onToggle(task.id);
  }, [onToggle, task.id]);

  return (
    <Animated.View style={cardStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          flexDirection:   'row',
          alignItems:      'center',
          backgroundColor: colors.surface,
          borderRadius:    borderRadius.lg,
          padding:         spacing.md,
          marginBottom:    spacing.xs,
          borderWidth:     borderWidth.thin,
          borderColor:     colors.border,
          ...shadow.sm,
        }}
      >
        {/* Checkbox */}
        <Animated.View
          style={[
            {
              width:        24,
              height:       24,
              borderRadius: borderRadius.sm,
              borderWidth:  borderWidth.medium,
              marginRight:  spacing.sm,
              alignItems:   'center',
              justifyContent: 'center',
            },
            checkStyle,
          ]}
        >
          {isCompleted && (
            <Typography variant="bodySm" color={colors.textInverse}>
              ✓
            </Typography>
          )}
        </Animated.View>

        {/* Content */}
        <View style={{ flex: 1 }}>
          <Typography
            variant="bodyMd"
            color={isCompleted ? colors.textSecondary : colors.textPrimary}
            style={isCompleted ? { textDecorationLine: 'line-through' } : undefined}
          >
            {task.title}
          </Typography>

          {task.description ? (
            <Typography
              variant="caption"
              color={colors.textSecondary}
              style={{ marginTop: spacing.xxs }}
            >
              {task.description}
            </Typography>
          ) : null}
        </View>

        {/* Priority dot */}
        <View
          style={{
            width:        8,
            height:       8,
            borderRadius: borderRadius.full,
            backgroundColor: PRIORITY_COLORS[task.priority],
            marginLeft:   spacing.sm,
          }}
        />
      </Pressable>
    </Animated.View>
  );
}
