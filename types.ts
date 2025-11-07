import type { ReactNode } from 'react';

export enum Category {
  STREAMING_SERIES = 'Streaming & Series',
  MUSIC = 'Music',
  EDUCATION_LEARNING = 'Education & Learning',
  AI = 'Artificial Intelligence',
  SECURITY = 'Security',
  GAMING_SUBS = 'Gaming & Suscriptions',
  LIVE_TV_SPORTS = 'Live TV & Sports',
  LIFESTYLE = 'Lifestyle',
  COMBOS = 'Combos',
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceUSD: number;
  priceBS: number;
  // Fix: Changed from JSX.Element to ReactNode to resolve issue with JSX namespace not being found.
  logo: ReactNode;
  description?: string;
}

export interface Combo {
  id: string;
  name: string;
  priceUSD: number;
  priceBS: number;
  included: string[];
  image: string; // URL or path to a representative image
  category: Category.COMBOS;
}

export type CartItem = (Product | Combo) & { quantity: number };

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
    sources?: { uri: string, title: string }[];
}
