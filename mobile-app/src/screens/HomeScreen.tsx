/**
 * Home Screen
 * Main dashboard showing learning options
 * Features two main cards: Letters and Numbers
 * Shows child's progress at the bottom
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';
import { ro } from '../i18n/ro';
import { RootStackParamList, BottomTabParamList } from '../types';
import { useProgress } from '../hooks/useProgress';
import CategoryCard from '../components/CategoryCard';
import ProgressStats from '../components/ProgressStats';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { progress } = useProgress();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            {ro.home.greeting.replace('{name}', progress.name)} 👋
          </Text>
          <Text style={styles.title}>{ro.home.title}</Text>
        </View>

        {/* Category Cards */}
        <View style={styles.cardsContainer}>
          {/* Letters Card */}
          <CategoryCard
            title={ro.home.lettersCard}
            subtitle="A, M, N, I, R"
            icon="text"
            backgroundColor={colors.simonaColor}
            iconBackgroundColor={colors.primaryDark}
            onPress={() => navigation.navigate('LettersList')}
          />
          
          {/* Spacing between cards */}
          <View style={styles.cardSpacer} />
          
          {/* Numbers Card */}
          <CategoryCard
            title={ro.home.numbersCard}
            subtitle="1, 2, 3, 4, 5"
            icon="calculator"
            backgroundColor={colors.eliseiColor}
            iconBackgroundColor="#5a9fd4"
            onPress={() => navigation.navigate('NumbersList')}
          />
        </View>

        {/* Progress Stats */}
        <ProgressStats />

        {/* AI Tutor placeholder - Coming Soon */}
        <TouchableOpacity 
          style={[styles.aiTutorCard, shadows.small]}
          disabled={true}
          activeOpacity={1}
        >
          <View style={styles.aiTutorContent}>
            <Ionicons name="sparkles" size={28} color={colors.textMuted} />
            <View style={styles.aiTutorTextContainer}>
              <Text style={styles.aiTutorTitle}>{ro.common.aiTutor}</Text>
              <Text style={styles.aiTutorSubtitle}>{ro.common.comingSoon}</Text>
            </View>
          </View>
          <View style={styles.comingSoonBadge}>
            <Text style={styles.comingSoonText}>🔜</Text>
          </View>
        </TouchableOpacity>
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
  greetingContainer: {
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: fonts.sizes.lg,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  cardsContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  cardSpacer: {
    width: spacing.md,
  },
  aiTutorCard: {
    backgroundColor: colors.backgroundDark + '10',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  aiTutorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiTutorTextContainer: {
    marginLeft: spacing.md,
  },
  aiTutorTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
    color: colors.textMuted,
  },
  aiTutorSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  comingSoonBadge: {
    backgroundColor: colors.backgroundGray,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  comingSoonText: {
    fontSize: fonts.sizes.lg,
  },
});

export default HomeScreen;
