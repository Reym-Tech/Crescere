// components/StatCard.tsx

import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Surface } from './ui/Surface';
import { Typography } from './ui/Typography';

interface StatCardProps {
  label:    string;
  value:    string;
  subtitle?: string;
  accent?:  string;
}

export function StatCard({ label, value, subtitle, accent }: StatCardProps) {
  const { colors, spacing, borderRadius } = useTheme();

  return (
    <Surface
      elevated
      style={{
        padding:      spacing.md,
        borderRadius: borderRadius.lg,
        flex:         1,
      }}
    >
      {accent && (
        <View
          style={{
            width:           3,
            height:          32,
            borderRadius:    borderRadius.full,
            backgroundColor: accent,
            position:        'absolute',
            left:            0,
            top:             spacing.md,
            borderTopLeftRadius:    borderRadius.lg,
            borderBottomLeftRadius: borderRadius.lg,
          }}
        />
      )}

      <Typography
        variant="labelCaps"
        color={colors.textSecondary}
        style={{ marginBottom: spacing.xxs }}
      >
        {label}
      </Typography>

      <Typography variant="h2" color={colors.textPrimary}>
        {value}
      </Typography>

      {subtitle ? (
        <Typography
          variant="caption"
          color={colors.textSecondary}
          style={{ marginTop: spacing.xxs }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Surface>
  );
}
