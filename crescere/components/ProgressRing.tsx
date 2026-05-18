// components/ProgressRing.tsx

import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  useValue,
  runTiming,
  Easing,
} from '@shopify/react-native-skia';
import { useTheme } from '../theme';
import { Typography } from './ui/Typography';

interface ProgressRingProps {
  ratio:     number;   // 0.0 – 1.0
  size?:     number;
  thickness?: number;
  showLabel?: boolean;
}

export function ProgressRing({
  ratio,
  size      = 120,
  thickness = 10,
  showLabel = true,
}: ProgressRingProps) {
  const { colors } = useTheme();
  const progress   = useValue(0);
  const cx         = size / 2;
  const cy         = size / 2;
  const r          = (size - thickness) / 2;

  useEffect(() => {
    runTiming(progress, ratio, {
      duration: 700,
      easing:   Easing.out(Easing.cubic),
    });
  }, [ratio]);

  // Full track arc
  const trackPath = Skia.Path.Make();
  trackPath.addCircle(cx, cy, r);

  // Progress arc (starts at top, -90°)
  const progressPath = Skia.Path.Make();
  const sweep        = 360 * ratio;
  progressPath.addArc(
    { x: cx - r, y: cy - r, width: r * 2, height: r * 2 },
    -90,
    sweep
  );

  const percent = `${Math.round(ratio * 100)}%`;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Canvas style={{ position: 'absolute', width: size, height: size }}>
        {/* Track */}
        <Path
          path={trackPath}
          color={colors.border}
          style="stroke"
          strokeWidth={thickness}
          strokeCap="round"
        />
        {/* Progress */}
        <Path
          path={progressPath}
          color={colors.primary}
          style="stroke"
          strokeWidth={thickness}
          strokeCap="round"
        />
      </Canvas>

      {showLabel && (
        <Typography variant="h3" color={colors.textPrimary} align="center">
          {percent}
        </Typography>
      )}
    </View>
  );
}
