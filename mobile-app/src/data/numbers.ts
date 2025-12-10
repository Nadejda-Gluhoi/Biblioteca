/**
 * Number lesson data for the MVP
 * Contains numbers 1-5
 * Each number has video reference, description, and counting objects
 */

import { NumberLesson } from '../types';

export const numbers: NumberLesson[] = [
  {
    id: 'number_1',
    value: 1,
    label: 'Cifra 1',
    description: 'Unu este primul număr. Când ai un singur obiect, ai UNU! Ca un soare pe cer.',
    video: 'cifra_1.mp4',
    countObjects: 'steluță',
    objectEmoji: '⭐',
  },
  {
    id: 'number_2',
    value: 2,
    label: 'Cifra 2',
    description: 'Doi înseamnă o pereche! Ai doi ochi, două mâini, două picioare.',
    video: 'cifra_2.mp4',
    countObjects: 'steluțe',
    objectEmoji: '⭐',
  },
  {
    id: 'number_3',
    value: 3,
    label: 'Cifra 3',
    description: 'Trei este un număr magic! Gândește-te la cele trei ursuleți din poveste.',
    video: 'cifra_3.mp4',
    countObjects: 'steluțe',
    objectEmoji: '⭐',
  },
  {
    id: 'number_4',
    value: 4,
    label: 'Cifra 4',
    description: 'Patru! Ca cele patru anotimpuri: primăvara, vara, toamna și iarna.',
    video: 'cifra_4.mp4',
    countObjects: 'steluțe',
    objectEmoji: '⭐',
  },
  {
    id: 'number_5',
    value: 5,
    label: 'Cifra 5',
    description: 'Cinci! Câte degete ai la o mână? Exact, CINCI!',
    video: 'cifra_5.mp4',
    countObjects: 'steluțe',
    objectEmoji: '⭐',
  },
];

// Helper function to get a number by ID
export const getNumberById = (id: string): NumberLesson | undefined => {
  return numbers.find((num) => num.id === id);
};

// Helper function to get a number by value
export const getNumberByValue = (value: number): NumberLesson | undefined => {
  return numbers.find((num) => num.value === value);
};
