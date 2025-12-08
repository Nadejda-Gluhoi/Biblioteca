/**
 * Letters List Screen
 * Displays all available letter lessons (A, M, N, I, R)
 * Each card has options to watch video or play game
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, fonts, spacing } from '../data/theme';
import { ro } from '../i18n/ro';
import { RootStackParamList, BottomTabParamList } from '../types';
import { letters } from '../data/letters';
import { useProgress } from '../hooks/useProgress';
import LessonCard from '../components/LessonCard';

type LettersListScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'LettersList'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type LettersListScreenProps = {
  navigation: LettersListScreenNavigationProp;
};

const LettersListScreen: React.FC<LettersListScreenProps> = ({ navigation }) => {
  const { isLessonCompleted } = useProgress();

  const handleWatchVideo = (letterId: string) => {
    navigation.navigate('VideoLesson', { lessonId: letterId, lessonType: 'letter' });
  };

  const handlePlayGame = (letterId: string) => {
    navigation.navigate('LetterGame', { letterId });
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
          <Text style={styles.subtitle}>{ro.letters.subtitle}</Text>
        </View>

        {/* Letter character decoration */}
        <View style={styles.decorationContainer}>
          <Text style={styles.decorationText}>A M N I R</Text>
        </View>

        {/* Letters list */}
        {letters.map((letter) => (
          <LessonCard
            key={letter.id}
            title={letter.label}
            subtitle={`Exemplu: ${letter.exampleWord}`}
            icon={letter.letter}
            iconColor={colors.simonaColor}
            isCompleted={isLessonCompleted(letter.id)}
            onWatchVideo={() => handleWatchVideo(letter.id)}
            onPlayGame={() => handlePlayGame(letter.id)}
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
    backgroundColor: colors.lettersAccent + '30',
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  decorationText: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.simonaColor,
    letterSpacing: 8,
  },
});

export default LettersListScreen;
