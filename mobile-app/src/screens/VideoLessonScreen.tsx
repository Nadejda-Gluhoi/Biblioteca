/**
 * Video Lesson Screen
 * Displays educational video content for a letter or number
 * Uses expo-video for video playback
 * Shows lesson description and navigation to game
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
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

const VideoLessonScreen: React.FC<VideoLessonScreenProps> = ({ navigation, route }) => {
  const { lessonId, lessonType } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const { completeLesson } = useProgress();

  // Get lesson data based on type
  const lesson = lessonType === 'letter' 
    ? getLetterById(lessonId) 
    : getNumberById(lessonId);

  // Create video player with expo-video
  const player = useVideoPlayer(
    'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', // Placeholder video
    (player) => {
      player.loop = false;
      setIsLoading(false);
    }
  );

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

  const handleWatchAgain = () => {
    player.replay();
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

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Player */}
        <View style={[styles.videoContainer, shadows.medium]}>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>{ro.video.loading}</Text>
            </View>
          )}
          
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          
          {/* Lesson title overlay */}
          <View style={styles.videoTitleOverlay}>
            <Text style={styles.videoTitle}>{lessonTitle}</Text>
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
            title={ro.video.watchAgain}
            onPress={handleWatchAgain}
            variant="outline"
            size="large"
            style={styles.button}
          />
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
    backgroundColor: colors.textPrimary,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: spacing.lg,
  },
  video: {
    width: '100%',
    height: VIDEO_HEIGHT,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: colors.textLight,
    fontSize: fonts.sizes.md,
    marginTop: spacing.md,
  },
  videoTitleOverlay: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: colors.primary + 'CC',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  videoTitle: {
    color: colors.textLight,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
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
