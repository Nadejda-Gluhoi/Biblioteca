/**
 * Letter game questions and logic
 * Generates questions for the "find the correct letter" game
 */

import { LetterGameQuestion } from '../types';
import { letters } from '../data/letters';

// All available letters for the MVP
const availableLetters = letters.map((l) => l.letter);

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generates a single letter game question
 * @param targetLetter - The letter the child needs to find
 * @returns A LetterGameQuestion object
 */
export const generateLetterQuestion = (targetLetter: string): LetterGameQuestion => {
  // Get other letters (not the target) for wrong options
  const otherLetters = availableLetters.filter((l) => l !== targetLetter);
  
  // Pick 3 random wrong options
  const shuffledOthers = shuffleArray(otherLetters);
  const wrongOptions = shuffledOthers.slice(0, 3);
  
  // Combine target with wrong options and shuffle
  const allOptions = shuffleArray([targetLetter, ...wrongOptions]);
  
  return {
    targetLetter,
    options: allOptions,
    prompt: `Alege litera ${targetLetter}`,
  };
};

/**
 * Generates multiple questions for a letter game session
 * @param letterId - The ID of the letter lesson
 * @param questionCount - Number of questions to generate (default 3)
 * @returns Array of LetterGameQuestion objects
 */
export const generateLetterGameSession = (
  letterId: string,
  questionCount: number = 3
): LetterGameQuestion[] => {
  const letterLesson = letters.find((l) => l.id === letterId);
  if (!letterLesson) return [];
  
  const questions: LetterGameQuestion[] = [];
  
  // First question is always the main letter
  questions.push(generateLetterQuestion(letterLesson.letter));
  
  // Additional questions can include other letters for variety
  const otherLetters = shuffleArray(
    availableLetters.filter((l) => l !== letterLesson.letter)
  );
  
  for (let i = 1; i < questionCount && i - 1 < otherLetters.length; i++) {
    // Mix: some questions for the main letter, some for others
    if (i % 2 === 0) {
      questions.push(generateLetterQuestion(letterLesson.letter));
    } else {
      questions.push(generateLetterQuestion(otherLetters[i - 1]));
    }
  }
  
  return questions;
};

/**
 * Check if the selected answer is correct
 */
export const checkLetterAnswer = (
  question: LetterGameQuestion,
  selectedLetter: string
): boolean => {
  return question.targetLetter === selectedLetter;
};
