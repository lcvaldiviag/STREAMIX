
import React from 'react';
import { Product, Combo, Category } from './types';

// Generic SVG Icon for placeholders
export const PlaceholderIcon = ({ icon, color }: { icon: string, color?: string }): React.ReactElement => (
  React.createElement('div', { 
    className: "w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg",
    style: { backgroundColor: color ? `${color}1A` : undefined }
  },
    React.createElement('span', { 
      className: "text-xl font-bold text-slate-600",
      style: { color: color || undefined }
    }, icon)
  )
);

export const PRODUCTS: Product[] = [
  // --- Streaming & Series ---
  { id: 'prod-01', name: 'Netflix', category: Category.STREAMING_SERIES, priceUSD: 4.80, priceBS: 48, logo: "N", brandColor: '#E50914', description: 'Disfruta de películas y series sin límites. Perfiles ultra HD disponibles.' },
  { id: 'prod-02', name: 'Disney+', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "D+", brandColor: '#113CCF', description: 'Disney, Pixar, Marvel, Star Wars y National Geographic.'},
  { id: 'prod-03', name: 'Star Plus', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "S+", brandColor: '#D83B92', description: 'Deportes en vivo de ESPN y tus series favoritas.' },
  { id: 'prod-combo-ds', name: 'Combo Disney+ y Star+', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "C+", brandColor: '#113CCF', description: 'Todo el contenido de Disney y Star en un solo paquete.' },
  { id: 'prod-04', name: 'Prime Video', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "P", brandColor: '#00A8E1', description: 'Películas, series y Amazon Originals.' },
  { id: 'prod-05', name: 'Paramount+', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "P+", brandColor: '#0064FF', description: 'Grandes éxitos de taquilla y series originales.' },
  { id: 'prod-06', name: 'Apple TV+', category: Category.STREAMING_SERIES, priceUSD: 4.00, priceBS: 40, logo: "A+", brandColor: '#000000', description: 'Historias originales de las mentes más brillantes del cine.' },
  { id: 'prod-07', name: 'HBO Max', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "M", brandColor: '#8A2BE2', description: 'Warner Bros, DC, HBO y Cartoon Network.' },
  { id: 'prod-cine', name: 'Cineplanet', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "CP", brandColor: '#003DA5', description: 'Tus películas favoritas en cartelera con precios especiales.' },
  { id: 'prod-08', name: 'Crunchyroll Mega Fan', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "C", brandColor: '#F47521', description: 'Anime sin anuncios y nuevos episodios poco después de Japón.' },
  { id: 'prod-30', name: 'Movistar Play', category: Category.STREAMING_SERIES, priceUSD: 7.00, priceBS: 70, logo: "MP", brandColor: '#00A9E0', description: 'Canales en vivo y contenido exclusivo de Movistar.' },
  { id: 'prod-29', name: 'DirecTV Go', category: Category.STREAMING_SERIES, priceUSD: 10.00, priceBS: 100, logo: "DTV", brandColor: '#009FDB', description: 'La mejor experiencia en TV en vivo y deportes.' },
  { id: 'prod-09', name: 'VIX', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "V", brandColor: '#FFC800', description: 'Entretenimiento en español: series, películas y deportes.' },
  { id: 'prod-viki', name: 'VIKI Rakuten', category: Category.STREAMING_SERIES, priceUSD: 2.50, priceBS: 25, logo: "VK", brandColor: '#3C9CD7', description: 'Dramas coreanos, chinos y japoneses con subtítulos.' },
  { id: 'prod-tele', name: 'Telelatino', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "TL", brandColor: '#E50914', description: 'Cine, series y TV en vivo para toda la familia.' },
  { id: 'prod-gxmax', name: 'GX MAX NUVIA', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "GX", brandColor: '#000000', description: 'Plataforma premium de entretenimiento variado.' },
  { id: 'prod-10', name: 'Drama Box', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "DB", brandColor: '#E60073', description: 'Tus dramas cortos favoritos en formato vertical.' },

  // --- Music ---
  { id: 'prod-11', name: 'Spotify', category: Category.MUSIC, priceUSD: 5.00, priceBS: 50, logo: "S", brandColor: '#1DB954', description: 'Música ilimitada sin comerciales y en alta calidad.' },
  { id: 'prod-12', name: 'Deezer', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "D", brandColor: '#EF5466', description: 'Millones de canciones y playlists personalizadas.' },
  { id: 'prod-13', name: 'YouTube Premium', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YT", brandColor: '#FF0000', description: 'Videos sin anuncios y reproducción en segundo plano.' },
  { id: 'prod-14', name: 'YouTube Music', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YM", brandColor: '#FF0000', description: 'Acceso exclusivo a la biblioteca musical de YouTube.' },
  { id: 'prod-yt-bundle', name: 'YouTube Premium + Music', category: Category.MUSIC, priceUSD: 4.00, priceBS: 40, logo: "Y+", brandColor: '#FF0000', description: 'El combo completo para disfrutar videos y música.' },

  // --- Education & Learning ---
  { id: 'prod-15', name: 'Duolingo', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "DL", brandColor: '#58CC02', description: 'Aprende idiomas de forma divertida con Super Duolingo.' },
  { id: 'prod-office-edu', name: 'Office Educativo', category: Category.EDUCATION_LEARNING, priceUSD: 3.50, priceBS: 35, logo: "OE", brandColor: '#D83B01', description: 'Suite Office original para fines académicos.' },
  { id: 'prod-16', name: 'Canva Pro + curso', category: Category.EDUCATION_LEARNING, priceUSD: 1.00, priceBS: 10, logo: "CP", brandColor: '#8E44AD', description: '¡Edición Ilimitada! Incluye Licencia PRO x 30 días + el curso de diseño. El acceso vitalicio es para el curso vía DRIVE que recibirás en tu correo personal.' },
  { id: 'prod-17', name: 'CapCut Pro + curso', category: Category.EDUCATION_LEARNING, priceUSD: 2.50, priceBS: 25, logo: "CC", brandColor: '#00D68F', description: 'Licencia CapCut PRO x 30 días + el curso de edición profesional. El acceso vitalicio es exclusivo al CURSO que recibirás en tu correo.' },
  { id: 'prod-adobe', name: 'Adobe CC', category: Category.EDUCATION_LEARNING, priceUSD: 20.00, priceBS: 200, logo: "Ad", brandColor: '#FF0000', description: 'Todas las apps creativas de Adobe en una sola suscripción.' },
  { id: 'prod-18', name: 'Microsoft 365', category: Category.EDUCATION_LEARNING, priceUSD: 9.99, priceBS: 99, logo: "365", brandColor: '#D83B01', description: 'Word, Excel, PowerPoint y 1TB en la nube.' },
  { id: 'prod-win', name: 'Windows 10 / 11', category: Category.EDUCATION_LEARNING, priceUSD: 12.00, priceBS: 120, logo: "W", brandColor: '#0078D4', description: 'Licencia original para tu sistema operativo.' },
  { id: 'prod-autodesk', name: 'Autodesk', category: Category.EDUCATION_LEARNING, priceUSD: 15.00, priceBS: 150, logo: "Au", brandColor: '#0696D7', description: 'Software profesional para arquitectura e ingeniería.' },
  { id: 'prod-wassender', name: 'WasSender', category: Category.EDUCATION_LEARNING, priceUSD: 14.99, priceBS: 149, logo: "WS", brandColor: '#25D366', description: 'Automatiza tu marketing en WhatsApp de forma profesional.' },
  { id: 'prod-19', name: 'Grammarly', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "G", brandColor: '#15C79A', description: 'Asistente de escritura para textos perfectos en inglés.' },
  { id: 'prod-quillbot', name: 'Quillbot', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "QB", brandColor: '#4CA152', description: 'Parafraseador inteligente para mejorar tus textos.' },
  { id: 'prod-smarter', name: 'Smarter PRO', category: Category.EDUCATION_LEARNING, priceUSD: 2.80, priceBS: 28, logo: "SP", brandColor: '#2C3E50', description: 'Potencia tu productividad con herramientas avanzadas.' },

  // --- Artificial Intelligence ---
  { id: 'prod-20', name: 'ChatGPT (GPT-5) Renovable', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "GPT", brandColor: '#74AA9C', description: 'Acceso a la versión más avanzada y renovable de ChatGPT.' },
  { id: 'prod-gpt-plus', name: 'ChatGPT Plus', category: Category.AI, priceUSD: 4.20, priceBS: 42, logo: "GP", brandColor: '#10A37F', description: 'Funciones exclusivas y acceso prioritario a nuevos modelos.' },
  { id: 'prod-gpt-account', name: 'ChatGPT por cuenta', category: Category.AI, priceUSD: 14.99, priceBS: 149, logo: "GA", brandColor: '#74AA9C', description: 'Cuenta privada para máxima privacidad y control.' },
  { id: 'prod-gpt-edu', name: 'ChatGPT Edu', category: Category.AI, priceUSD: 3.50, priceBS: 35, logo: "GE", brandColor: '#00A67E', description: 'Versión optimizada para entornos académicos.' },
  { id: 'prod-gemini', name: 'Gemini (AI)', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "Ge", brandColor: '#4285F4', description: 'La IA multimodal más avanzada de Google.' },
  { id: 'prod-bing', name: 'Bing AI Pro', category: Category.AI, priceUSD: 3.00, priceBS: 30, logo: "Bi", brandColor: '#0078D4', description: 'Búsqueda inteligente y creativa potenciada por IA.' },
  { id: 'prod-copilot', name: 'Copilot Pro', category: Category.AI, priceUSD: 3.00, priceBS: 30, logo: "CP", brandColor: '#F25022', description: 'Tu compañero de IA en las apps de Microsoft 365.' },
  { id: 'prod-22', name: 'Midjourney', category: Category.AI, priceUSD: 6.00, priceBS: 60, logo: "MJ", brandColor: '#00A6FF', description: 'Generación de imágenes artísticas impresionantes.' },
  { id: 'prod-did', name: 'D-ID AI', category: Category.AI, priceUSD: 4.00, priceBS: 40, logo: "DI", brandColor: '#121212', description: 'Crea videos con avatares parlantes realistas.' },
  { id: 'prod-23', name: 'ElevenLabs', category: Category.AI, priceUSD: 4.00, priceBS: 40, logo: "11", brandColor: '#2C2C2C', description: 'Voz sintética líder en realismo y clonación.' },

  // --- Security ---
  { id: 'prod-24', name: 'NOD32 Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "N32", brandColor: '#009CDE', description: 'Protección eficiente y rápida contra amenazas.' },
  { id: 'prod-25', name: 'Kaspersky', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "K", brandColor: '#00A651', description: 'Seguridad robusta para tu vida digital.' },
  { id: 'prod-norton', name: 'Norton Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "Nor", brandColor: '#F9D508', description: 'Protección multicapa para tus dispositivos.' },
  { id: 'prod-eset', name: 'ESET Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "E", brandColor: '#009CDE', description: 'Defensa integral contra malware y hackers.' },

  // --- Gaming & Subscriptions ---
  { id: 'prod-ps-essential', name: 'PlayStation Plus Essential', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "PS", brandColor: '#0070D1', description: 'Acceso online y juegos gratuitos cada mes.' },
  { id: 'prod-27', name: 'Xbox Game Pass', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "X", brandColor: '#107C10', description: 'Cientos de juegos increíbles por un solo precio.' },

  // --- Live TV & Sports ---
  { id: 'prod-28', name: 'MagisTV', category: Category.LIVE_TV_SPORTS, priceUSD: 5.00, priceBS: 50, logo: "Mag", brandColor: '#FF6F00', description: 'Todo el contenido de TV y deportes en vivo.' },
  { id: 'prod-iptv', name: 'IPTV', category: Category.LIVE_TV_SPORTS, priceUSD: 2.50, priceBS: 25, logo: "IP", brandColor: '#607D8B', description: 'Canales internacionales a tu alcance.' },
  { id: 'prod-panel', name: 'Panel IPTV', category: Category.LIVE_TV_SPORTS, priceUSD: 4.20, priceBS: 42, logo: "PI", brandColor: '#455A64', description: 'Control total de tu servicio de streaming.' },

  // --- Lifestyle ---
  { id: 'prod-31', name: 'Membresía Black Smart Fit', category: Category.LIFESTYLE, priceUSD: 25.00, priceBS: 250, logo: "SF", brandColor: '#FFC72C', description: 'Entrena sin límites en toda la red Smart Fit.' },
];

export const COMBOS: Combo[] = [
  { id: 'combo-1', name: 'Pack Cinéfilo', priceUSD: 8.00, priceBS: 80, included: ['Netflix', 'Disney+', 'Prime Video'], image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-2', name: 'Suite del Creador', priceUSD: 8.00, priceBS: 80, included: ['Canva Pro', 'CapCut Pro', 'ChatGPT+'], image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-3', name: 'Entretenimiento Total', priceUSD: 6.00, priceBS: 60, included: ['YouTube Premium', 'HBO Max', 'Paramount+'], image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-4', name: 'Trío de TV en Vivo', priceUSD: 16.20, priceBS: 162, included: ['MagisTV', 'DirecTV Go', 'Movistar Play'], image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-5', name: 'Mix Internacional', priceUSD: 9.25, priceBS: 92.5, included: ['VIX', 'DramaBox', 'Crunchyroll'], image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
];

export const WHATSAPP_NUMBER = '59162656572';
export const QR_CODE_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STREAMIX_USD_PAYMENT';
