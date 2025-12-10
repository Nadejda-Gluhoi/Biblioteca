/**
 * Number Game Screen
 * Educational game where children count objects and select the correct number
 * Features Elisei character guiding the child
 * Rewards correct answers with stars and confetti
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';
import { ro } from '../i18n/ro';
import { RootStackParamList, NumberGameQuestion, GameResult } from '../types';
import { generateNumberGameSession, checkNumberAnswer, renderObjectsArray } from '../game/numberGames';
import { getNumberById } from '../data/numbers';
import { useProgress } from '../hooks/useProgress';
import Character from '../components/Character';
import GameOptionButton from '../components/GameOptionButton';
import ConfettiOverlay from '../components/ConfettiOverlay';
import Button from '../components/Button';

type NumberGameScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'NumberGame'>;
  route: RouteProp<RootStackParamList, 'NumberGame'>;
};

const NumberGameScreen: React.FC<NumberGameScreenProps> = ({ navigation, route }) => {
  const { numberId } = route.params;
  const { recordGameResult, addStars } = useProgress();
  
  // Game state
  const [questions, setQuestions] = useState<NumberGameQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Initialize game
  useEffect(() => {
    const gameQuestions = generateNumberGameSession(numberId, 3);
    setQuestions(gameQuestions);
  }, [numberId]);

  const currentQuestion = questions[currentQuestionIndex];
  const number = getNumberById(numberId);

  const handleAnswerSelect = useCallback((answer: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const correct = currentQuestion ? checkNumberAnswer(currentQuestion, answer) : false;
    setIsCorrect(correct);

    if (correct) {
      setTotalStars((prev) => prev + 1);
      setShowConfetti(true);
    }
  }, [selectedAnswer, currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Game complete
      setGameComplete(true);
      
      // Record game result
      const result: GameResult = {
        lessonId: numberId,
        lessonType: 'number',
        correct: totalStars > 0,
        starsEarned: totalStars,
        timestamp: Date.now(),
      };
      recordGameResult(result);
    }
  }, [currentQuestionIndex, questions.length, numberId, totalStars, recordGameResult]);

  const handleConfettiEnd = useCallback(() => {
    setShowConfetti(false);
  }, []);

  const handleFinish = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePlayAgain = useCallback(() => {
    const gameQuestions = generateNumberGameSession(numberId, 3);
    setQuestions(gameQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTotalStars(0);
    setGameComplete(false);
  }, [numberId]);

  const getButtonState = (option: number) => {
    if (selectedAnswer === null) return 'default';
    if (option === currentQuestion?.targetNumber) return 'correct';
    if (option === selectedAnswer && !isCorrect) return 'incorrect';
    return 'default';
  };

  // Game complete screen
  if (gameComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.completeContainer}>
          <Text style={styles.completeEmoji}>🎉</Text>
          <Text style={styles.completeTitle}>{ro.results.congratulations}</Text>
          <Text style={styles.completeStars}>
            {ro.results.youEarned.replace('{stars}', totalStars.toString())}
          </Text>
          
          <View style={styles.starsDisplay}>
            {Array.from({ length: totalStars }).map((_, i) => (
              <Text key={i} style={styles.starEmoji}>⭐</Text>
            ))}
          </View>

          <View style={styles.completeButtons}>
            <Button
              title={ro.results.playAgain}
              onPress={handlePlayAgain}
              variant="outline"
              size="large"
              style={styles.completeButton}
            />
            <Button
              title={ro.results.backToHome}
              onPress={handleFinish}
              variant="primary"
              size="large"
              style={styles.completeButton}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentQuestion || !number) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{ro.common.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Render objects to count
  const objectsToCount = renderObjectsArray(currentQuestion.objectCount, currentQuestion.objectEmoji);

  return (
    <SafeAreaView style={styles.container}>
      <ConfettiOverlay
        visible={showConfetti}
        message={ro.numberGame.correct}
        onAnimationEnd={handleConfettiEnd}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} / {questions.length}
          </Text>
          <View style={styles.starsContainer}>
            <Text style={styles.starsText}>⭐ {totalStars}</Text>
          </View>
        </View>

        {/* Character with question */}
        <Character
          name="elisei"
          message={currentQuestion.prompt}
          size="large"
        />

        {/* Objects to count */}
        <View style={[styles.objectsContainer, shadows.medium]}>
          <View style={styles.objectsGrid}>
            {objectsToCount.map((emoji, index) => (
              <Text key={index} style={styles.objectEmoji}>
                {emoji}
              </Text>
            ))}
          </View>
        </View>

        {/* Answer options */}
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            {currentQuestion.options.map((option) => (
              <GameOptionButton
                key={option}
                label={option}
                onPress={() => handleAnswerSelect(option)}
                state={getButtonState(option)}
                disabled={selectedAnswer !== null}
                size="large"
              />
            ))}
          </View>
        </View>

        {/* Feedback message */}
        {selectedAnswer !== null && (
          <View style={[
            styles.feedbackContainer,
            isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
          ]}>
            <Text style={styles.feedbackText}>
              {isCorrect ? ro.numberGame.correct : ro.numberGame.incorrect}
            </Text>
            {isCorrect && <Text style={styles.starEarned}>{ro.numberGame.starEarned}</Text>}
          </View>
        )}

        {/* Next/Finish button */}
        {selectedAnswer !== null && (
          <Button
            title={currentQuestionIndex < questions.length - 1 
              ? ro.numberGame.nextQuestion 
              : ro.numberGame.finish}
            onPress={handleNextQuestion}
            variant="primary"
            size="large"
            style={styles.nextButton}
          />
        )}
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  progressText: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.textSecondary,
  },
  starsContainer: {
    backgroundColor: colors.star + '20',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  starsText: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.star,
  },
  objectsContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  objectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  objectEmoji: {
    fontSize: 50,
    margin: spacing.sm,
  },
  optionsContainer: {
    alignItems: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  feedbackContainer: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  feedbackCorrect: {
    backgroundColor: colors.success + '20',
  },
  feedbackIncorrect: {
    backgroundColor: colors.error + '20',
  },
  feedbackText: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
  },
  starEarned: {
    fontSize: fonts.sizes.lg,
    color: colors.star,
    marginTop: spacing.sm,
  },
  nextButton: {
    marginTop: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: fonts.sizes.lg,
    color: colors.textSecondary,
  },
  // Complete screen styles
  completeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  completeEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  completeTitle: {
    fontSize: fonts.sizes.xxxl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  completeStars: {
    fontSize: fonts.sizes.xl,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  starsDisplay: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  starEmoji: {
    fontSize: 40,
    marginHorizontal: spacing.sm,
  },
  completeButtons: {
    width: '100%',
    gap: spacing.md,
  },
  completeButton: {
    width: '100%',
  },
});

export default NumberGameScreen;
