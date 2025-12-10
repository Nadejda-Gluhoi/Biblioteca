/**
 * Letter Game Screen
 * Educational game where children find the correct letter
 * Features Simona character guiding the child
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
import { RootStackParamList, LetterGameQuestion, GameResult } from '../types';
import { generateLetterGameSession, checkLetterAnswer } from '../game/letterGames';
import { getLetterById } from '../data/letters';
import { useProgress } from '../hooks/useProgress';
import Character from '../components/Character';
import GameOptionButton from '../components/GameOptionButton';
import ConfettiOverlay from '../components/ConfettiOverlay';
import Button from '../components/Button';

type LetterGameScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LetterGame'>;
  route: RouteProp<RootStackParamList, 'LetterGame'>;
};

const LetterGameScreen: React.FC<LetterGameScreenProps> = ({ navigation, route }) => {
  const { letterId } = route.params;
  const { recordGameResult, addStars } = useProgress();
  
  // Game state
  const [questions, setQuestions] = useState<LetterGameQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Initialize game
  useEffect(() => {
    const gameQuestions = generateLetterGameSession(letterId, 3);
    setQuestions(gameQuestions);
  }, [letterId]);

  const currentQuestion = questions[currentQuestionIndex];
  const letter = getLetterById(letterId);

  const handleAnswerSelect = useCallback((answer: string) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const correct = currentQuestion ? checkLetterAnswer(currentQuestion, answer) : false;
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
        lessonId: letterId,
        lessonType: 'letter',
        correct: totalStars > 0,
        starsEarned: totalStars,
        timestamp: Date.now(),
      };
      recordGameResult(result);
    }
  }, [currentQuestionIndex, questions.length, letterId, totalStars, recordGameResult]);

  const handleConfettiEnd = useCallback(() => {
    setShowConfetti(false);
  }, []);

  const handleFinish = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handlePlayAgain = useCallback(() => {
    const gameQuestions = generateLetterGameSession(letterId, 3);
    setQuestions(gameQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTotalStars(0);
    setGameComplete(false);
  }, [letterId]);

  const getButtonState = (option: string) => {
    if (selectedAnswer === null) return 'default';
    if (option === currentQuestion?.targetLetter) return 'correct';
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

  if (!currentQuestion || !letter) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{ro.common.loading}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ConfettiOverlay
        visible={showConfetti}
        message={ro.letterGame.correct}
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
          name="simona"
          message={currentQuestion.prompt}
          size="large"
        />

        {/* Answer options */}
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            {currentQuestion.options.slice(0, 2).map((option) => (
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
          <View style={styles.optionsRow}>
            {currentQuestion.options.slice(2, 4).map((option) => (
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
              {isCorrect ? ro.letterGame.correct : ro.letterGame.incorrect}
            </Text>
            {isCorrect && <Text style={styles.starEarned}>{ro.letterGame.starEarned}</Text>}
          </View>
        )}

        {/* Next/Finish button */}
        {selectedAnswer !== null && (
          <Button
            title={currentQuestionIndex < questions.length - 1 
              ? ro.letterGame.nextQuestion 
              : ro.letterGame.finish}
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
  optionsContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.md,
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

export default LetterGameScreen;
