import type { ReactNode } from 'react';

export enum Category {
  STREAMING_SERIES = 'Streaming y Series',
  COMBOS = 'Combos',
  MUSIC = 'Música',
  EDUCATION_LEARNING = 'Educación y Aprendizaje',
  AI = 'Inteligencia Artificial',
  SECURITY = 'Seguridad',
  GAMING_SUBS = 'Gaming y Suscripciones',
  LIVE_TV_SPORTS = 'TV en Vivo y Deportes',
  LIFESTYLE = 'Estilo de Vida',
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceUSD: number;
  priceBS: number;
  // Fix: Changed from JSX.Element to ReactNode to resolve issue with JSX namespace not being found.
  logo: string;
  description?: string;
  brandColor?: string;
  soldOut?: boolean;
  specialOffer?: boolean;
  originalPriceUSD?: number;
}

export interface Combo {
  id:string;
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