/**
 * TypeScript type definitions for the Biblioteca app
 */

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  rating: number;
  isNew?: boolean;
  description?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  books: Book[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

// Navigation types
export type RootTabParamList = {
  Home: undefined;
  Collection: undefined;
  Books: undefined;
  News: undefined;
  Contact: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  BookDetail: { bookId: string };
};
