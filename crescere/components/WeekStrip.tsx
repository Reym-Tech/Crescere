// components/WeekStrip.tsx

import React, { useCallback } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../theme';
import { Typography } from './ui/Typography';
import { getWeekDays } from '../utils/dateHelpers';
import { hapticSelection } from '../utils/haptics';

interface WeekStripProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function WeekStrip({ selectedDate, onSelectDate }: WeekStripProps) {
  const { colors, spacing, borderRadius } = useTheme();
  const weekDays = getWeekDays(selectedDate);

  const handleSelect = useCallback(
    async (date: string) => {
      await hapticSelection();
      onSelectDate(date);
    },
    [onSelectDate]
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'row',
        gap:           spacing.xs,
        paddingHorizontal: spacing.md,
      }}
    >
      {weekDays.map((date, index) => {
        const isSelected = date === selectedDate;
        const dayNum     = new Date(date + 'T00:00:00').getDate();

        return (
          <Pressable
            key={date}
            onPress={() => handleSelect(date)}
            style={{
              alignItems:      'center',
              justifyContent:  'center',
              width:           40,
              height:          56,
              borderRadius:    borderRadius.md,
              backgroundColor: isSelected ? colors.primary : colors.surface,
              borderWidth:     1,
              borderColor:     isSelected ? colors.primary : colors.border,
            }}
          >
            <Typography
              variant="labelCaps"
              color={isSelected ? colors.textInverse : colors.textSecondary}
            >
              {DAY_LABELS[index]}
            </Typography>
            <Typography
              variant="bodyMd"
              color={isSelected ? colors.textInverse : colors.textPrimary}
              style={{ fontWeight: '500', marginTop: 2 }}
            >
              {dayNum}
            </Typography>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
