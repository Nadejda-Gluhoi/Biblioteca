/**
 * Progress Context Provider
 * Manages child's learning progress with AsyncStorage persistence
 * Provides methods to add stars, complete lessons, and track games
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChildProgress, GameResult } from '../types';

// Storage key for AsyncStorage
const STORAGE_KEY = '@edumind_kids_progress';

// Default progress state for new users
const defaultProgress: ChildProgress = {
  name: 'Prietene',
  totalStars: 0,
  completedLessons: [],
  gamesPlayed: 0,
  gameResults: [],
};

// Context type definition
interface ProgressContextType {
  progress: ChildProgress;
  isLoading: boolean;
  addStars: (count: number) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
  recordGameResult: (result: GameResult) => Promise<void>;
  setChildName: (name: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
}

// Create context with default values
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

/**
 * Progress Provider Component
 * Wraps the app and provides progress state to all children
 */
export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ChildProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from AsyncStorage on mount
  useEffect(() => {
    loadProgress();
  }, []);

  /**
   * Loads saved progress from AsyncStorage
   */
  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChildProgress;
        setProgress(parsed);
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Saves current progress to AsyncStorage
   */
  const saveProgress = async (newProgress: ChildProgress) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  /**
   * Adds stars to the total count (reward system)
   */
  const addStars = async (count: number) => {
    const newProgress = {
      ...progress,
      totalStars: progress.totalStars + count,
    };
    await saveProgress(newProgress);
  };

  /**
   * Marks a lesson as completed
   */
  const completeLesson = async (lessonId: string) => {
    if (progress.completedLessons.includes(lessonId)) return;
    
    const newProgress = {
      ...progress,
      completedLessons: [...progress.completedLessons, lessonId],
    };
    await saveProgress(newProgress);
  };

  /**
   * Records a game result and updates statistics
   */
  const recordGameResult = async (result: GameResult) => {
    const newProgress = {
      ...progress,
      gamesPlayed: progress.gamesPlayed + 1,
      totalStars: progress.totalStars + result.starsEarned,
      gameResults: [...progress.gameResults, result],
    };
    await saveProgress(newProgress);
  };

  /**
   * Updates the child's display name
   */
  const setChildName = async (name: string) => {
    const newProgress = {
      ...progress,
      name,
    };
    await saveProgress(newProgress);
  };

  /**
   * Resets all progress to default state
   */
  const resetProgress = async () => {
    await saveProgress(defaultProgress);
  };

  /**
   * Checks if a specific lesson has been completed
   */
  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.completedLessons.includes(lessonId);
  };

  const value: ProgressContextType = {
    progress,
    isLoading,
    addStars,
    completeLesson,
    recordGameResult,
    setChildName,
    resetProgress,
    isLessonCompleted,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

/**
 * Custom hook to use the Progress context
 * Must be used within a ProgressProvider
 */
export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
