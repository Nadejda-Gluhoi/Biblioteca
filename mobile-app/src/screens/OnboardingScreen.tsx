/**
 * Onboarding Screen
 * First screen shown to new users
 * Features Simona and Elisei characters with welcome message
 * User taps "Începe aventura" to proceed to main app
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, spacing, borderRadius, shadows } from '../data/theme';
import { ro } from '../i18n/ro';
import { RootStackParamList } from '../types';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const handleStart = () => {
    // Navigate to main tabs and reset navigation stack
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Background decoration */}
      <View style={styles.decorationTop} />
      <View style={styles.decorationBottom} />

      <View style={styles.content}>
        {/* App title */}
        <View style={styles.titleContainer}>
          <Text style={styles.appName}>{ro.appName}</Text>
          <Text style={styles.appSubtitle}>{ro.appSubtitle}</Text>
        </View>

        {/* Characters illustration */}
        <View style={styles.charactersContainer}>
          {/* Simona */}
          <View style={[styles.characterCircle, styles.simonaCircle]}>
            <Text style={styles.characterEmoji}>👧</Text>
            <Text style={styles.characterName}>Simona</Text>
          </View>
          
          {/* Heart between characters */}
          <Text style={styles.heartEmoji}>💕</Text>
          
          {/* Elisei */}
          <View style={[styles.characterCircle, styles.eliseiCircle]}>
            <Text style={styles.characterEmoji}>👦</Text>
            <Text style={styles.characterName}>Elisei</Text>
          </View>
        </View>

        {/* Welcome message */}
        <View style={styles.messageContainer}>
          <Text style={styles.welcomeText}>{ro.onboarding.welcome}</Text>
          <Text style={styles.mainText}>{ro.onboarding.mainText}</Text>
          <Text style={styles.subText}>{ro.onboarding.characters}</Text>
        </View>

        {/* Decorative elements */}
        <View style={styles.decorativeIcons}>
          <Text style={styles.decorativeEmoji}>📚</Text>
          <Text style={styles.decorativeEmoji}>✨</Text>
          <Text style={styles.decorativeEmoji}>🔢</Text>
          <Text style={styles.decorativeEmoji}>⭐</Text>
          <Text style={styles.decorativeEmoji}>🎨</Text>
        </View>

        {/* Start button */}
        <View style={styles.buttonContainer}>
          <Button
            title={ro.onboarding.startButton}
            onPress={handleStart}
            variant="primary"
            size="xlarge"
            style={styles.startButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  decorationTop: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.lettersAccent + '30',
  },
  decorationBottom: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.numbersAccent + '30',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  appName: {
    fontSize: fonts.sizes.title,
    fontWeight: fonts.weights.extrabold,
    color: colors.primary,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.medium,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  charactersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  characterCircle: {
    width: 120,
    height: 140,
    borderRadius: borderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.large,
  },
  simonaCircle: {
    backgroundColor: colors.simonaColor,
  },
  eliseiCircle: {
    backgroundColor: colors.eliseiColor,
  },
  characterEmoji: {
    fontSize: 60,
    marginBottom: spacing.sm,
  },
  characterName: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.textLight,
  },
  heartEmoji: {
    fontSize: 40,
    marginHorizontal: spacing.md,
  },
  messageContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  welcomeText: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  mainText: {
    fontSize: fonts.sizes.lg,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: spacing.md,
  },
  subText: {
    fontSize: fonts.sizes.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  decorativeIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  decorativeEmoji: {
    fontSize: 28,
    marginHorizontal: spacing.sm,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  startButton: {
    width: '100%',
  },
});

export default OnboardingScreen;
