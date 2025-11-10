import React from 'react';
import { Product, Combo, Category } from './types';

// Generic SVG Icon for placeholders
// Fix: Re-written without JSX to be compatible with a .ts file.
export const PlaceholderIcon = ({ icon, color }: { icon: string, color?: string }): React.ReactElement => (
  React.createElement('div', { 
    className: "w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg",
    style: { backgroundColor: color ? `${color}1A` : undefined } // Use brand color with alpha if available
  },
    React.createElement('span', { 
      className: "text-xl font-bold text-slate-600",
      style: { color: color || undefined }
    }, icon)
  )
);

export const PRODUCTS: Product[] = [
  // Streaming & Series
  { id: 'prod-01', name: 'Netflix', category: Category.STREAMING_SERIES, priceUSD: 4.80, priceBS: 48, logo: "N", brandColor: '#E50914', description: 'Watch unlimited movies, TV shows, and more. Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.' },
  { id: 'prod-02', name: 'Disney+', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "D+", brandColor: '#113CCF', description: 'The best stories from Disney, Pixar, Marvel, Star Wars, and National Geographic, plus Star Originals. All in one place.'},
  { id: 'prod-03', name: 'Star Plus', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "S+", brandColor: '#D83B92', description: 'Enjoy the latest releases, classics, and exclusive originals from Star, plus live sports from ESPN.' },
  { id: 'prod-04', name: 'Prime Video', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "P", brandColor: '#00A8E1', description: 'Watch movies, TV, and sports, including award-winning Amazon Originals. Enjoy on your favorite devices.' },
  { id: 'prod-05', name: 'Paramount+', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "P+", brandColor: '#0064FF', description: 'A mountain of entertainment. Discover original series, hit movies, and live sports.' },
  { id: 'prod-06', name: 'Apple TV+', category: Category.STREAMING_SERIES, priceUSD: 4.00, priceBS: 40, logo: "A+", brandColor: '#000000', description: 'Home of Apple Originals. Watch award-winning series, compelling dramas, groundbreaking documentaries, and kids entertainment.' },
  { id: 'prod-07', name: 'HBO Max', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "M", brandColor: '#8A2BE2', description: 'Experience the best of HBO, Warner Bros, DC, Cartoon Network, and more. All your favorites in one place.' },
  { id: 'prod-08', name: 'Crunchyroll', category: Category.STREAMING_SERIES, priceUSD: 3.50, priceBS: 35, logo: "C", brandColor: '#F47521', description: 'The world’s largest collection of anime. Stream new episodes one hour after Japan, and explore a vast library of manga.' },
  { id: 'prod-09', name: 'VIX', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "V", brandColor: '#FFC800', description: 'The largest Spanish-language streaming service in the world. Enjoy original series, movies, and live sports.' },
  { id: 'prod-10', name: 'Drama Box', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "DB", brandColor: '#E60073', description: 'A collection of short, dramatic series perfect for watching on the go. New episodes added daily.' },

  // Music
  { id: 'prod-11', name: 'Spotify', category: Category.MUSIC, priceUSD: 5.00, priceBS: 50, logo: "S", brandColor: '#1DB954', description: 'Music for everyone. Listen to millions of songs and podcasts without ads. Play anywhere - even offline.' },
  { id: 'prod-12', name: 'Deezer', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "D", brandColor: '#EF5466', description: 'Your personal music companion. Access over 90 million tracks, podcasts, and radio channels.' },
  { id: 'prod-13', name: 'YouTube Premium', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YT", brandColor: '#FF0000', description: 'Enjoy ad-free videos, background play, and downloads. Includes access to YouTube Music Premium.' },
  { id: 'prod-14', name: 'YouTube Music', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YM", brandColor: '#FF0000', description: 'A music streaming service from YouTube. Find the music you love and let YouTube Music help you discover new favorites.' },

  // Education & Learning
  { id: 'prod-15', name: 'Duolingo', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "DL", brandColor: '#58CC02', description: 'Learn a new language for free. Fun, effective, and backed by science. Supercharge your learning with Duolingo Plus.' },
  { id: 'prod-16', name: 'Canva Pro', category: Category.EDUCATION_LEARNING, priceUSD: 2.00, priceBS: 20, logo: "C", brandColor: '#8E44AD', description: 'Design anything. Canva Pro makes it easy to create professional designs and to scale your brand’s visual identity.' },
  { id: 'prod-17', name: 'CapCut Pro', category: Category.EDUCATION_LEARNING, priceUSD: 2.50, priceBS: 25, logo: "CC", brandColor: '#00D68F', description: 'The all-in-one video editor for everyone. Create stunning videos with powerful and easy-to-use tools.' },
  { id: 'prod-18', name: 'Microsoft 365', category: Category.EDUCATION_LEARNING, priceUSD: 9.99, priceBS: 99, logo: "O", brandColor: '#D83B01', description: 'Your productivity cloud. Get premium versions of Word, Excel, PowerPoint, Outlook, and more.' },
  { id: 'prod-19', name: 'Grammarly', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "G", brandColor: '#15C79A', description: 'Great writing, simplified. Compose bold, clear, mistake-free writing with Grammarly’s AI-powered writing assistant.' },

  // Artificial Intelligence
  { id: 'prod-20', name: 'ChatGPT+', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "GPT", brandColor: '#74AA9C', description: 'Get faster response times, priority access to new features, and more with ChatGPT Plus.' },
  { id: 'prod-21', name: 'Gemini (AI)', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "G", brandColor: '#8E44AD', description: 'Supercharge your creativity and productivity with Gemini Advanced, Google\'s most capable AI model.' },
  { id: 'prod-22', name: 'Midjourney', category: Category.AI, priceUSD: 6.00, priceBS: 60, logo: "MJ", brandColor: '#00A6FF', description: 'An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.' },
  { id: 'prod-23', name: 'ElevenLabs', category: Category.AI, priceUSD: 4.00, priceBS: 40, logo: "E", brandColor: '#2C2C2C', description: 'The most realistic and versatile AI speech software, ever. Generate high-quality spoken audio in any voice and style.' },

  // Security
  { id: 'prod-24', name: 'NOD32 Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "N32", brandColor: '#009CDE', description: 'Legendary antivirus technology. Protect yourself from ransomware and other types of malware with ESET\'s time-proven multilayered protection.' },
  { id: 'prod-25', name: 'Kaspersky', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "K", brandColor: '#00A651', description: 'Complete protection from cyberthreats. Get the power of protection with Kaspersky’s award-winning security.' },

  // Gaming & Subscriptions
  { id: 'prod-26', name: 'PlayStation Plus', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "PS", brandColor: '#0070D1', description: 'Enhance your PlayStation experience with online multiplayer, monthly games, exclusive discounts and more.' },
  { id: 'prod-27', name: 'Xbox Game Pass', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "X", brandColor: '#107C10', description: 'Get access to over 100 high-quality games for console, PC, and mobile devices. New games added all the time.' },

  // Live TV & Sports
  { id: 'prod-28', name: 'MagisTV', category: Category.LIVE_TV_SPORTS, priceUSD: 4.60, priceBS: 46, logo: "M", brandColor: '#FF6F00', description: 'The best of live television. Enjoy hundreds of channels from around the world, plus a vast library of on-demand content.' },
  { id: 'prod-29', name: 'DirecTV Go', category: Category.LIVE_TV_SPORTS, priceUSD: 10.00, priceBS: 100, logo: "DTV", brandColor: '#009FDB', description: 'Live TV and sports wherever you are. No need for a satellite dish or installation.' },
  { id: 'prod-30', name: 'Movistar Play', category: Category.LIVE_TV_SPORTS, priceUSD: 7.00, priceBS: 70, logo: "MP", brandColor: '#00A9E0', description: 'Enjoy live channels, thousands of movies and series on demand, and exclusive content.' },

  // Lifestyle
  { id: 'prod-31', name: 'Smart Fit Black', category: Category.LIFESTYLE, priceUSD: 25.00, priceBS: 250, logo: "SF", brandColor: '#FFC72C', description: 'The ultimate gym experience. Access to all Smart Fit locations, plus exclusive benefits for Black members.' },
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