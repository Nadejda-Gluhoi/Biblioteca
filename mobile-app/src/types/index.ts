/**
 * TypeScript type definitions for EduMind Kids app
 * Defines all the data structures used throughout the application
 */

// Base lesson type that both letters and numbers extend
export interface Lesson {
  id: string;
  description: string;
  video: string;
}

// Letter lesson type with specific fields for alphabet learning
export interface LetterLesson extends Lesson {
  letter: string;
  label: string;
  exampleWord: string;
  exampleWordImage?: string;
}

// Number lesson type with specific fields for counting
export interface NumberLesson extends Lesson {
  value: number;
  label: string;
  countObjects: string; // Type of objects to count (e.g., "steluțe", "mere")
  objectEmoji: string;
}

// Result of a game session
export interface GameResult {
  lessonId: string;
  lessonType: 'letter' | 'number';
  correct: boolean;
  starsEarned: number;
  timestamp: number;
}

// Child's progress data stored in AsyncStorage
export interface ChildProgress {
  name: string;
  totalStars: number;
  completedLessons: string[];
  gamesPlayed: number;
  gameResults: GameResult[];
}

// Letter game question structure
export interface LetterGameQuestion {
  targetLetter: string;
  options: string[];
  prompt: string;
}

// Number game question structure
export interface NumberGameQuestion {
  targetNumber: number;
  objectCount: number;
  objectEmoji: string;
  options: number[];
  prompt: string;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  Letters: undefined;
  Numbers: undefined;
  VideoLesson: { lessonId: string; lessonType: 'letter' | 'number' };
  LetterGame: { letterId: string };
  NumberGame: { numberId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  LettersList: undefined;
  NumbersList: undefined;
  Profile: undefined;
};
