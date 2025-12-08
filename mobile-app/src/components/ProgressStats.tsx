/**
 * Progress Stats Component
 * Displays the child's learning progress with icons and numbers
 * Shows completed lessons, stars collected, and games played
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';
import { ro } from '../i18n/ro';
import { useProgress } from '../hooks/useProgress';

interface StatItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  value: number;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, iconColor, value, label }) => (
  <View style={styles.statItem}>
    <View style={[styles.iconCircle, { backgroundColor: iconColor + '20' }]}>
      <Ionicons name={icon} size={28} color={iconColor} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ProgressStats: React.FC = () => {
  const { progress } = useProgress();

  return (
    <View style={[styles.container, shadows.medium]}>
      <Text style={styles.title}>{ro.home.progressSection}</Text>
      
      <View style={styles.statsRow}>
        <StatItem
          icon="book"
          iconColor={colors.secondary}
          value={progress.completedLessons.length}
          label={ro.home.lessonsCompleted}
        />
        <StatItem
          icon="star"
          iconColor={colors.star}
          value={progress.totalStars}
          label={ro.home.starsCollected}
        />
        <StatItem
          icon="game-controller"
          iconColor={colors.primary}
          value={progress.gamesPlayed}
          label={ro.home.gamesPlayed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default ProgressStats;
