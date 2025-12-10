/**
 * Number game questions and logic
 * Generates questions for the "count the objects" game
 */

import { NumberGameQuestion } from '../types';
import { numbers } from '../data/numbers';

// Different objects to count (with emojis for visual appeal)
const countableObjects = [
  { name: 'steluțe', emoji: '⭐' },
  { name: 'mere', emoji: '🍎' },
  { name: 'flori', emoji: '🌸' },
  { name: 'inimi', emoji: '❤️' },
  { name: 'baloane', emoji: '🎈' },
  { name: 'ursuleți', emoji: '🧸' },
];

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
 * Gets a random object type for counting
 */
const getRandomObject = () => {
  const index = Math.floor(Math.random() * countableObjects.length);
  return countableObjects[index];
};

/**
 * Generates wrong number options that are close to the correct answer
 */
const generateWrongOptions = (correctNumber: number, count: number = 2): number[] => {
  const options: number[] = [];
  const possibleWrong = [1, 2, 3, 4, 5].filter((n) => n !== correctNumber);
  
  // Prefer numbers close to the correct answer
  const sorted = possibleWrong.sort(
    (a, b) => Math.abs(a - correctNumber) - Math.abs(b - correctNumber)
  );
  
  return sorted.slice(0, count);
};

/**
 * Generates a single number game question
 * @param targetNumber - The number the child needs to identify
 * @returns A NumberGameQuestion object
 */
export const generateNumberQuestion = (targetNumber: number): NumberGameQuestion => {
  const object = getRandomObject();
  const wrongOptions = generateWrongOptions(targetNumber, 2);
  
  // Combine correct answer with wrong options and shuffle
  const allOptions = shuffleArray([targetNumber, ...wrongOptions]);
  
  return {
    targetNumber,
    objectCount: targetNumber,
    objectEmoji: object.emoji,
    options: allOptions,
    prompt: `Câte ${object.name} vezi?`,
  };
};

/**
 * Generates multiple questions for a number game session
 * @param numberId - The ID of the number lesson
 * @param questionCount - Number of questions to generate (default 3)
 * @returns Array of NumberGameQuestion objects
 */
export const generateNumberGameSession = (
  numberId: string,
  questionCount: number = 3
): NumberGameQuestion[] => {
  const numberLesson = numbers.find((n) => n.id === numberId);
  if (!numberLesson) return [];
  
  const questions: NumberGameQuestion[] = [];
  
  // First question is always the main number
  questions.push(generateNumberQuestion(numberLesson.value));
  
  // Additional questions can include other numbers for variety
  const otherNumbers = shuffleArray(
    numbers.filter((n) => n.id !== numberId).map((n) => n.value)
  );
  
  for (let i = 1; i < questionCount && i - 1 < otherNumbers.length; i++) {
    // Mix: some questions for the main number, some for others
    if (i % 2 === 0) {
      questions.push(generateNumberQuestion(numberLesson.value));
    } else {
      questions.push(generateNumberQuestion(otherNumbers[i - 1]));
    }
  }
  
  return questions;
};

/**
 * Check if the selected answer is correct
 */
export const checkNumberAnswer = (
  question: NumberGameQuestion,
  selectedNumber: number
): boolean => {
  return question.targetNumber === selectedNumber;
};

/**
 * Renders objects for display (returns array of emojis)
 */
export const renderObjectsArray = (count: number, emoji: string): string[] => {
  return Array(count).fill(emoji);
};
