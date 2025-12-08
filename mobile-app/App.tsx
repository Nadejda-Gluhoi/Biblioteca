/**
 * EduMind Kids - Simona și Elisei
 * Main Application Entry Point
 * 
 * An educational mobile app for children (5-8 years) to learn
 * letters and numbers through animated videos and interactive games.
 * 
 * Built with React Native + Expo + TypeScript
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import Navigation from './src/navigation';
import { ProgressProvider, useProgress } from './src/context/ProgressContext';
import { colors } from './src/data/theme';

/**
 * Loading Screen Component
 * Shown while app is initializing and loading saved progress
 */
const LoadingScreen: React.FC = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.loadingEmoji}>📚</Text>
    <Text style={styles.loadingTitle}>EduMind Kids</Text>
    <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
    <Text style={styles.loadingText}>Se încarcă...</Text>
  </View>
);

/**
 * App Content Component
 * Renders navigation once progress is loaded
 */
const AppContent: React.FC = () => {
  const { isLoading } = useProgress();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Navigation />;
};

/**
 * Main App Component
 * Wraps the app with ProgressProvider for global state management
 */
export default function App() {
  return (
    <ProgressProvider>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <AppContent />
    </ProgressProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  loadingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 30,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
