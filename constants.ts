import React from 'react';
import { Product, Combo, Category } from './types';

// Generic SVG Icon for placeholders
// Fix: Re-written without JSX to be compatible with a .ts file.
export const PlaceholderIcon = ({ icon }: { icon: string }): React.ReactElement => (
  React.createElement('div', { className: "w-12 h-12 flex items-center justify-center bg-gray-700/50 rounded-lg" },
    React.createElement('span', { className: "text-xl font-bold text-[#3A86FF]" }, icon)
  )
);

export const PRODUCTS: Product[] = [
  // Fix: Replaced JSX with React.createElement to avoid syntax errors in a .ts file.
  // Streaming & Series
  { id: 'prod-01', name: 'Netflix', category: Category.STREAMING_SERIES, priceUSD: 4.80, priceBS: 48, logo: "N" },
  { id: 'prod-02', name: 'Disney+', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "D+" },
  { id: 'prod-03', name: 'Star Plus', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "S+" },
  { id: 'prod-04', name: 'Prime Video', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "P" },
  { id: 'prod-05', name: 'Paramount+', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "P+" },
  { id: 'prod-06', name: 'Apple TV+', category: Category.STREAMING_SERIES, priceUSD: 4.00, priceBS: 40, logo: "A+" },
  { id: 'prod-07', name: 'HBO Max', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "M" },
  { id: 'prod-08', name: 'Crunchyroll', category: Category.STREAMING_SERIES, priceUSD: 3.50, priceBS: 35, logo: "C" },
  { id: 'prod-09', name: 'VIX', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "V" },
  { id: 'prod-10', name: 'Drama Box', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "DB" },

  // Music
  { id: 'prod-11', name: 'Spotify', category: Category.MUSIC, priceUSD: 5.00, priceBS: 50, logo: "S" },
  { id: 'prod-12', name: 'Deezer', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "D" },
  { id: 'prod-13', name: 'YouTube Premium', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YT" },
  { id: 'prod-14', name: 'YouTube Music', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YM" },

  // Education & Learning
  { id: 'prod-15', name: 'Duolingo', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "DL" },
  { id: 'prod-16', name: 'Canva Pro', category: Category.EDUCATION_LEARNING, priceUSD: 2.00, priceBS: 20, logo: "C" },
  { id: 'prod-17', name: 'CapCut Pro', category: Category.EDUCATION_LEARNING, priceUSD: 2.50, priceBS: 25, logo: "CC" },
  { id: 'prod-18', name: 'Microsoft 365', category: Category.EDUCATION_LEARNING, priceUSD: 9.99, priceBS: 99, logo: "O" },
  { id: 'prod-19', name: 'Grammarly', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "G" },

  // Artificial Intelligence
  { id: 'prod-20', name: 'ChatGPT+', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "GPT" },
  { id: 'prod-21', name: 'Gemini (AI)', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "G" },
  { id: 'prod-22', name: 'Midjourney', category: Category.AI, priceUSD: 6.00, priceBS: 60, logo: "MJ" },
  { id: 'prod-23', name: 'ElevenLabs', category: Category.AI, priceUSD: 4.00, priceBS: 40, logo: "E" },

  // Security
  { id: 'prod-24', name: 'NOD32 Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "N32" },
  { id: 'prod-25', name: 'Kaspersky', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "K" },

  // Gaming & Subscriptions
  { id: 'prod-26', name: 'PlayStation Plus', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "PS" },
  { id: 'prod-27', name: 'Xbox Game Pass', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "X" },

  // Live TV & Sports
  { id: 'prod-28', name: 'MagisTV', category: Category.LIVE_TV_SPORTS, priceUSD: 4.60, priceBS: 46, logo: "M" },
  { id: 'prod-29', name: 'DirecTV Go', category: Category.LIVE_TV_SPORTS, priceUSD: 10.00, priceBS: 100, logo: "DTV" },
  { id: 'prod-30', name: 'Movistar Play', category: Category.LIVE_TV_SPORTS, priceUSD: 7.00, priceBS: 70, logo: "MP" },

  // Lifestyle
  { id: 'prod-31', name: 'Smart Fit Black', category: Category.LIFESTYLE, priceUSD: 25.00, priceBS: 250, logo: "SF" },
];

export const COMBOS: Combo[] = [
  { id: 'combo-1', name: 'Cinephile Pack', priceUSD: 8.10, priceBS: 81, included: ['Netflix', 'Disney+', 'Prime Video'], image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-2', name: 'Creator Suite', priceUSD: 7.10, priceBS: 71, included: ['Canva Pro', 'CapCut Pro', 'ChatGPT+'], image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-3', name: 'Ultimate Entertainment', priceUSD: 6.00, priceBS: 60, included: ['YT Premium + Music', 'HBO Max', 'Paramount+'], image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-4', name: 'Live TV Trio', priceUSD: 16.20, priceBS: 162, included: ['MagisTV', 'DirecTV Go', 'Movistar Play'], image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-5', name: 'International Mix', priceUSD: 9.25, priceBS: 92.5, included: ['VIX', 'DramaBox', 'Crunchyroll'], image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
];


export const WHATSAPP_NUMBER = '59162656572';
export const QR_CODE_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STREAMIX_USD_PAYMENT'; // A reliable placeholder QR code.