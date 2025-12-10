/**
 * Video Lesson Screen
 * Displays educational video content for a letter or number
 * Uses expo-video for video playback
 * Shows lesson description and navigation to game
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';
import { ro } from '../i18n/ro';
import { RootStackParamList } from '../types';
import { getLetterById } from '../data/letters';
import { getNumberById } from '../data/numbers';
import { useProgress } from '../hooks/useProgress';
import Button from '../components/Button';
import Character from '../components/Character';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = (width - spacing.lg * 2) * 0.5625; // 16:9 aspect ratio

type VideoLessonScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'VideoLesson'>;
  route: RouteProp<RootStackParamList, 'VideoLesson'>;
};

/**
 * Video Player Placeholder Component
 * Shows a placeholder image since actual videos are not available in MVP
 */
const VideoPlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderEmoji}>🎬</Text>
    <Text style={styles.placeholderTitle}>{title}</Text>
    <Text style={styles.placeholderSubtitle}>Video educativ</Text>
    <Text style={styles.placeholderNote}>
      (În versiunea completă aici va fi un desen animat)
    </Text>
  </View>
);

const VideoLessonScreen: React.FC<VideoLessonScreenProps> = ({ navigation, route }) => {
  const { lessonId, lessonType } = route.params;
  const { completeLesson } = useProgress();

  // Get lesson data based on type
  const lesson = lessonType === 'letter' 
    ? getLetterById(lessonId) 
    : getNumberById(lessonId);

  useEffect(() => {
    // Set header title based on lesson
    if (lesson) {
      navigation.setOptions({
        headerTitle: lessonType === 'letter' 
          ? `Litera ${'letter' in lesson ? lesson.letter : ''}` 
          : `Cifra ${'value' in lesson ? lesson.value : ''}`,
      });
    }
  }, [lesson, lessonType, navigation]);

  const handleContinueToGame = async () => {
    // Mark lesson as completed
    await completeLesson(lessonId);
    
    // Navigate to appropriate game
    if (lessonType === 'letter') {
      navigation.replace('LetterGame', { letterId: lessonId });
    } else {
      navigation.replace('NumberGame', { numberId: lessonId });
    }
  };

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{ro.common.error}</Text>
          <Button
            title={ro.common.back}
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  // Determine which character speaks based on lesson type
  const characterName = lessonType === 'letter' ? 'simona' : 'elisei';
  const lessonTitle = lessonType === 'letter' && 'letter' in lesson
    ? `Litera ${lesson.letter}` 
    : 'value' in lesson 
      ? `Cifra ${lesson.value}` 
      : '';

  // Get the display symbol for the placeholder
  const displaySymbol = lessonType === 'letter' && 'letter' in lesson
    ? lesson.letter
    : 'value' in lesson
      ? lesson.value.toString()
      : '?';

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Placeholder */}
        <View style={[styles.videoContainer, shadows.medium]}>
          <VideoPlaceholder title={lessonTitle} />
          
          {/* Big symbol display */}
          <View style={styles.symbolContainer}>
            <Text style={styles.symbolText}>{displaySymbol}</Text>
          </View>
        </View>

        {/* Character with description */}
        <Character
          name={characterName}
          message={lesson.description}
          size="medium"
        />

        {/* Additional lesson info */}
        <View style={[styles.infoCard, shadows.small]}>
          {'exampleWord' in lesson && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cuvânt exemplu:</Text>
              <Text style={styles.infoValue}>{lesson.exampleWord}</Text>
            </View>
          )}
          {'countObjects' in lesson && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Vom număra:</Text>
              <Text style={styles.infoValue}>
                {'objectEmoji' in lesson ? lesson.objectEmoji : ''} {lesson.countObjects}
              </Text>
            </View>
          )}
        </View>

        {/* Action buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title={ro.video.continueToGame}
            onPress={handleContinueToGame}
            variant="primary"
            size="large"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  videoContainer: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: spacing.lg,
    minHeight: VIDEO_HEIGHT,
  },
  placeholderContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  placeholderTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  placeholderSubtitle: {
    fontSize: fonts.sizes.md,
    color: colors.textLight,
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  placeholderNote: {
    fontSize: fonts.sizes.sm,
    color: colors.textLight,
    opacity: 0.7,
    fontStyle: 'italic',
  },
  symbolContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    fontSize: fonts.sizes.title,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  infoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginVertical: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoLabel: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  buttonsContainer: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorText: {
    fontSize: fonts.sizes.lg,
    color: colors.textLight,
    marginBottom: spacing.lg,
  },
});

export default VideoLessonScreen;
