/**
 * Letter lesson data for the MVP
 * Contains 5 letters: A, M, N, I, R
 * Each letter has video reference, description, and example word
 */

import { LetterLesson } from '../types';

export const letters: LetterLesson[] = [
  {
    id: 'letter_a',
    letter: 'A',
    label: 'Litera A',
    description: 'A este prima literă din alfabet. Se pronunță "a" ca în cuvântul "albină".',
    video: 'litera_A.mp4',
    exampleWord: 'Albină',
    exampleWordImage: 'albina.png',
  },
  {
    id: 'letter_m',
    letter: 'M',
    label: 'Litera M',
    description: 'M se pronunță "m" ca în cuvântul "mama". Este o literă foarte importantă!',
    video: 'litera_M.mp4',
    exampleWord: 'Mama',
    exampleWordImage: 'mama.png',
  },
  {
    id: 'letter_n',
    letter: 'N',
    label: 'Litera N',
    description: 'N se pronunță "n" ca în cuvântul "nor". Gândește-te la norii de pe cer!',
    video: 'litera_N.mp4',
    exampleWord: 'Nor',
    exampleWordImage: 'nor.png',
  },
  {
    id: 'letter_i',
    letter: 'I',
    label: 'Litera I',
    description: 'I se pronunță "i" ca în cuvântul "iepure". Este o literă subțire și înaltă!',
    video: 'litera_I.mp4',
    exampleWord: 'Iepure',
    exampleWordImage: 'iepure.png',
  },
  {
    id: 'letter_r',
    letter: 'R',
    label: 'Litera R',
    description: 'R se pronunță "r" ca în cuvântul "rac". Este o literă care vibrează!',
    video: 'litera_R.mp4',
    exampleWord: 'Rac',
    exampleWordImage: 'rac.png',
  },
];

// Helper function to get a letter by ID
export const getLetterById = (id: string): LetterLesson | undefined => {
  return letters.find((letter) => letter.id === id);
};

// Helper function to get a letter by character
export const getLetterByChar = (char: string): LetterLesson | undefined => {
  return letters.find((letter) => letter.letter === char.toUpperCase());
};
