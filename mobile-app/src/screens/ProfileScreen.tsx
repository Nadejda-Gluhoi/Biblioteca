/**
 * Profile Screen
 * Displays child's progress, statistics, and achievements
 * Allows viewing total stars, completed lessons, and games played
 * Includes option to reset progress
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';
import { ro } from '../i18n/ro';
import { useProgress } from '../hooks/useProgress';
import Button from '../components/Button';

// Stat card component
interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  value: number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, iconColor, value, label }) => (
  <View style={[styles.statCard, shadows.small]}>
    <View style={[styles.statIconContainer, { backgroundColor: iconColor + '20' }]}>
      <Ionicons name={icon} size={32} color={iconColor} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ProfileScreen: React.FC = () => {
  const { progress, resetProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleResetProgress = () => {
    Alert.alert(
      ro.profile.resetProgress,
      ro.profile.resetConfirm,
      [
        {
          text: ro.profile.no,
          style: 'cancel',
        },
        {
          text: ro.profile.yes,
          style: 'destructive',
          onPress: async () => {
            await resetProgress();
          },
        },
      ]
    );
  };

  // Calculate achievements
  const achievements = [
    {
      id: 'first_star',
      title: 'Prima Stea',
      description: 'Ai câștigat prima ta stea!',
      emoji: '⭐',
      unlocked: progress.totalStars >= 1,
    },
    {
      id: 'five_stars',
      title: 'Colecționar de Stele',
      description: 'Ai câștigat 5 stele!',
      emoji: '🌟',
      unlocked: progress.totalStars >= 5,
    },
    {
      id: 'first_lesson',
      title: 'Primul Pas',
      description: 'Ai terminat prima lecție!',
      emoji: '📚',
      unlocked: progress.completedLessons.length >= 1,
    },
    {
      id: 'first_game',
      title: 'Jucăuș',
      description: 'Ai jucat primul tău joc!',
      emoji: '🎮',
      unlocked: progress.gamesPlayed >= 1,
    },
    {
      id: 'five_games',
      title: 'Expert la Jocuri',
      description: 'Ai jucat 5 jocuri!',
      emoji: '🏆',
      unlocked: progress.gamesPlayed >= 5,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile header */}
        <View style={[styles.profileHeader, shadows.medium]}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👶</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.nameLabel}>{ro.profile.childName}</Text>
            <Text style={styles.nameValue}>{progress.name}</Text>
          </View>
          <View style={styles.totalStarsContainer}>
            <Text style={styles.totalStarsEmoji}>⭐</Text>
            <Text style={styles.totalStarsValue}>{progress.totalStars}</Text>
          </View>
        </View>

        {/* Statistics section */}
        <Text style={styles.sectionTitle}>{ro.profile.statistics}</Text>
        <View style={styles.statsGrid}>
          <StatCard
            icon="book"
            iconColor={colors.secondary}
            value={progress.completedLessons.length}
            label={ro.profile.lessonsCompleted}
          />
          <StatCard
            icon="game-controller"
            iconColor={colors.primary}
            value={progress.gamesPlayed}
            label={ro.profile.gamesPlayed}
          />
          <StatCard
            icon="star"
            iconColor={colors.star}
            value={progress.totalStars}
            label={ro.profile.totalStars}
          />
        </View>

        {/* Achievements section */}
        <Text style={styles.sectionTitle}>{ro.profile.achievements}</Text>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementCard,
                !achievement.unlocked && styles.achievementLocked,
                shadows.small,
              ]}
            >
              <Text style={styles.achievementEmoji}>
                {achievement.unlocked ? achievement.emoji : '🔒'}
              </Text>
              <View style={styles.achievementInfo}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.achievementTitleLocked,
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
              </View>
              {achievement.unlocked && (
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              )}
            </View>
          ))}
        </View>

        {/* Reset progress button */}
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetProgress}
          activeOpacity={0.7}
        >
          <Ionicons name="refresh-outline" size={20} color={colors.error} />
          <Text style={styles.resetButtonText}>{ro.profile.resetProgress}</Text>
        </TouchableOpacity>

        {/* App info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>EduMind Kids v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>Simona și Elisei</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  profileHeader: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  nameLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  nameValue: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  totalStarsContainer: {
    alignItems: 'center',
    backgroundColor: colors.star + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
  },
  totalStarsEmoji: {
    fontSize: 28,
  },
  totalStarsValue: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.star,
  },
  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  statIconContainer: {
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
  },
  statLabel: {
    fontSize: fonts.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  achievementsContainer: {
    marginBottom: spacing.xl,
  },
  achievementCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementEmoji: {
    fontSize: 36,
    marginRight: spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  achievementTitleLocked: {
    color: colors.textMuted,
  },
  achievementDescription: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  resetButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.error,
    fontWeight: fonts.weights.medium,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  appInfoText: {
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
  },
  appInfoSubtext: {
    fontSize: fonts.sizes.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});

export default ProfileScreen;
