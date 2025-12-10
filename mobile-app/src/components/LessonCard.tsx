/**
 * Lesson Card Component
 * Displays a letter or number lesson with icon, title, and action buttons
 * Used in the Letters and Numbers list screens
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';
import { ro } from '../i18n/ro';

interface LessonCardProps {
  title: string;
  subtitle?: string;
  icon: string | number;
  iconColor?: string;
  isCompleted?: boolean;
  onWatchVideo: () => void;
  onPlayGame: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  title,
  subtitle,
  icon,
  iconColor = colors.primary,
  isCompleted = false,
  onWatchVideo,
  onPlayGame,
}) => {
  return (
    <View style={[styles.container, shadows.medium]}>
      {/* Completion indicator */}
      {isCompleted && (
        <View style={styles.completedBadge}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
        </View>
      )}

      {/* Main content */}
      <View style={styles.content}>
        {/* Icon/Letter display */}
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
          <Text style={[styles.iconText, { color: iconColor }]}>
            {icon}
          </Text>
        </View>

        {/* Title and subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.videoButton]}
          onPress={onWatchVideo}
          activeOpacity={0.8}
        >
          <Ionicons name="play-circle" size={22} color={colors.textLight} />
          <Text style={styles.actionButtonText}>{ro.letters.watchVideo}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.gameButton]}
          onPress={onPlayGame}
          activeOpacity={0.8}
        >
          <Ionicons name="game-controller" size={22} color={colors.textLight} />
          <Text style={styles.actionButtonText}>{ro.letters.playGame}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  completedBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconText: {
    fontSize: fonts.sizes.title,
    fontWeight: fonts.weights.bold,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    lineHeight: fonts.sizes.md * fonts.lineHeights.relaxed,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  videoButton: {
    backgroundColor: colors.secondary,
  },
  gameButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    color: colors.textLight,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
  },
});

export default LessonCard;
