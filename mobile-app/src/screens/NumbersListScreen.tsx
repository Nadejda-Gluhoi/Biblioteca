/**
 * Numbers List Screen
 * Displays all available number lessons (1-5)
 * Each card has options to watch video or play counting game
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, fonts, spacing } from '../data/theme';
import { ro } from '../i18n/ro';
import { RootStackParamList, BottomTabParamList } from '../types';
import { numbers } from '../data/numbers';
import { useProgress } from '../hooks/useProgress';
import LessonCard from '../components/LessonCard';

type NumbersListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'NumbersList'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type NumbersListScreenProps = {
  navigation: NumbersListScreenNavigationProp;
};

const NumbersListScreen: React.FC<NumbersListScreenProps> = ({ navigation }) => {
  const { isLessonCompleted } = useProgress();

  const handleWatchVideo = (numberId: string) => {
    navigation.navigate('VideoLesson', { lessonId: numberId, lessonType: 'number' });
  };

  const handlePlayGame = (numberId: string) => {
    navigation.navigate('NumberGame', { numberId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>{ro.numbers.subtitle}</Text>
        </View>

        {/* Number decoration */}
        <View style={styles.decorationContainer}>
          <Text style={styles.decorationText}>1 2 3 4 5</Text>
        </View>

        {/* Numbers list */}
        {numbers.map((number) => (
          <LessonCard
            key={number.id}
            title={number.label}
            subtitle={number.description.substring(0, 50) + '...'}
            icon={number.value}
            iconColor={colors.eliseiColor}
            isCompleted={isLessonCompleted(number.id)}
            onWatchVideo={() => handleWatchVideo(number.id)}
            onPlayGame={() => handlePlayGame(number.id)}
          />
        ))}
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
  header: {
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
  },
  decorationContainer: {
    backgroundColor: colors.numbersAccent + '30',
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  decorationText: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.eliseiColor,
    letterSpacing: 8,
  },
});

export default NumbersListScreen;
