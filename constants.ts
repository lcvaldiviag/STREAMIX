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
  // --- Streaming & Series ---
  { id: 'prod-01', name: 'Netflix', category: Category.STREAMING_SERIES, priceUSD: 4.80, priceBS: 48, logo: "N", brandColor: '#E50914', description: 'Disfruta de películas, series y más sin límites. Amplia biblioteca de originales y documentales.' },
  { id: 'prod-02', name: 'Disney+', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "D+", brandColor: '#113CCF', description: 'Las mejores historias de Disney, Pixar, Marvel, Star Wars y National Geographic.'},
  { id: 'prod-03', name: 'Star Plus', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "S+", brandColor: '#D83B92', description: 'Deportes en vivo de ESPN, series favoritas y películas de éxito.' },
  { id: 'prod-combo-ds', name: 'Combo Disney+ y Star+', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "C+", brandColor: '#113CCF', description: 'El combo perfecto: entretenimiento ilimitado y deportes en vivo en un solo paquete.' },
  { id: 'prod-04', name: 'Prime Video', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "P", brandColor: '#00A8E1', description: 'Series Amazon Originals, películas populares y envíos rápidos en Amazon.' },
  { id: 'prod-05', name: 'Paramount+', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "P+", brandColor: '#0064FF', description: 'Una montaña de entretenimiento con series originales y películas taquilleras.' },
  { id: 'prod-06', name: 'Apple TV+', category: Category.STREAMING_SERIES, priceUSD: 4.00, priceBS: 40, logo: "A+", brandColor: '#000000', description: 'Apple Originals galardonados: series dramáticas, comedias y documentales.' },
  { id: 'prod-07', name: 'HBO Max', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "M", brandColor: '#8A2BE2', description: 'Todo HBO, Warner Bros, DC y Cartoon Network en un solo lugar.' },
  { id: 'prod-cine', name: 'Cineplanet', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "CP", brandColor: '#003DA5', description: 'Disfruta de los últimos estrenos en pantalla grande con códigos promocionales.' },
  { id: 'prod-08', name: 'Crunchyroll Mega Fan', category: Category.STREAMING_SERIES, priceUSD: 3.50, priceBS: 35, logo: "C", brandColor: '#F47521', description: 'Anime sin anuncios, nuevos episodios tras Japón y lectura de manga ilimitada.' },
  { id: 'prod-30', name: 'Movistar Play', category: Category.STREAMING_SERIES, priceUSD: 7.00, priceBS: 70, logo: "MP", brandColor: '#00A9E0', description: 'Televisión en vivo, películas y series exclusivas de Movistar.' },
  { id: 'prod-29', name: 'DirecTV Go', category: Category.STREAMING_SERIES, priceUSD: 10.00, priceBS: 100, logo: "DTV", brandColor: '#009FDB', description: 'TV en vivo y deportes sin instalaciones ni contratos a largo plazo.' },
  { id: 'prod-09', name: 'VIX', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "V", brandColor: '#FFC800', description: 'El streaming en español más grande: novelas, películas y noticias.' },
  { id: 'prod-viki', name: 'VIKI Rakuten', category: Category.STREAMING_SERIES, priceUSD: 2.50, priceBS: 25, logo: "VK", brandColor: '#3C9CD7', description: 'La mejor colección de dramas asiáticos, K-Pop y programas de variedades.' },
  { id: 'prod-tele', name: 'Telelatino', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "TL", brandColor: '#E50914', description: 'Canales latinos en vivo, películas y series bajo demanda en alta calidad.' },
  { id: 'prod-gxmax', name: 'GX MAX NUVIA', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "GX", brandColor: '#000000', description: 'Plataforma robusta para streaming de contenido variado y entretenimiento.' },
  { id: 'prod-10', name: 'Drama Box', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "DB", brandColor: '#E60073', description: 'Series cortas y dramas adictivos diseñados para ver en tu móvil.' },

  // --- Music ---
  { id: 'prod-11', name: 'Spotify', category: Category.MUSIC, priceUSD: 5.00, priceBS: 50, logo: "S", brandColor: '#1DB954', description: 'Música sin anuncios, reproducción offline y millones de canciones.' },
  { id: 'prod-12', name: 'Deezer', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "D", brandColor: '#EF5466', description: 'Tu flow musical personalizado. 90 millones de canciones en alta fidelidad.' },
  { id: 'prod-13', name: 'YouTube Premium', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YT", brandColor: '#FF0000', description: 'Videos sin anuncios, en segundo plano y descargas offline.' },
  { id: 'prod-14', name: 'YouTube Music', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YM", brandColor: '#FF0000', description: 'Streaming de música oficial, remixes y actuaciones en vivo.' },
  { id: 'prod-yt-bundle', name: 'YouTube Premium + Music', category: Category.MUSIC, priceUSD: 4.00, priceBS: 40, logo: "Y+", brandColor: '#FF0000', description: 'La experiencia completa: Videos sin anuncios y servicio de música ilimitado.' },

  // --- Education & Learning (Software & Tools) ---
  { id: 'prod-15', name: 'Duolingo', category: Category.EDUCATION_LEARNING, priceUSD: 2.00, priceBS: 20, logo: "DL", brandColor: '#58CC02', description: 'Aprende idiomas de forma divertida y efectiva. Versión Plus sin límites.' },
  { id: 'prod-office-edu', name: 'Office Educativo', category: Category.EDUCATION_LEARNING, priceUSD: 3.50, priceBS: 35, logo: "OE", brandColor: '#D83B01', description: 'Acceso a Word, Excel, PowerPoint y más para estudiantes y profesores.' },
  { id: 'prod-16', name: 'Canva Pro', category: Category.EDUCATION_LEARNING, priceUSD: 2.00, priceBS: 20, logo: "CP", brandColor: '#8E44AD', description: 'Diseña como un profesional con acceso a contenido premium y herramientas mágicas.' },
  { id: 'prod-17', name: 'CapCut Pro', category: Category.EDUCATION_LEARNING, priceUSD: 3.50, priceBS: 35, logo: "CC", brandColor: '#00D68F', description: 'Edición de video avanzada con efectos exclusivos y sin marcas de agua.' },
  { id: 'prod-adobe', name: 'Adobe CC', category: Category.EDUCATION_LEARNING, priceUSD: 20.00, priceBS: 200, logo: "Ad", brandColor: '#FF0000', description: 'Suite completa: Photoshop, Illustrator, Premiere y más. Creatividad sin límites.' },
  { id: 'prod-18', name: 'Microsoft 365', category: Category.EDUCATION_LEARNING, priceUSD: 9.99, priceBS: 99, logo: "365", brandColor: '#D83B01', description: 'Productividad en la nube con Office, 1TB de almacenamiento y seguridad avanzada.' },
  { id: 'prod-win', name: 'Windows 10 / 11', category: Category.EDUCATION_LEARNING, priceUSD: 12.00, priceBS: 120, logo: "W", brandColor: '#0078D4', description: 'Licencia original para activar tu sistema operativo Windows de forma segura.' },
  { id: 'prod-autodesk', name: 'Autodesk', category: Category.EDUCATION_LEARNING, priceUSD: 15.00, priceBS: 150, logo: "Au", brandColor: '#0696D7', description: 'Software de diseño 3D, ingeniería y construcción para profesionales.' },
  { id: 'prod-wassender', name: 'WasSender', category: Category.EDUCATION_LEARNING, priceUSD: 14.99, priceBS: 149, logo: "WS", brandColor: '#25D366', description: 'Automatiza tus mensajes de WhatsApp y potencia tu marketing digital. Licencia ANUAL.', specialOffer: true, originalPriceUSD: 18.00 },
  { id: 'prod-19', name: 'Grammarly', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "G", brandColor: '#15C79A', description: 'Escribe sin errores. Corrección gramatical y de estilo en tiempo real.' },
  { id: 'prod-quillbot', name: 'Quillbot', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "QB", brandColor: '#4CA152', description: 'Parafraseador avanzado con IA para mejorar tu redacción al instante.' },
  { id: 'prod-smarter', name: 'Smarter PRO', category: Category.EDUCATION_LEARNING, priceUSD: 2.80, priceBS: 28, logo: "SP", brandColor: '#2C3E50', description: 'Organiza tus estudios y tareas con herramientas inteligentes de productividad.' },

  // --- Artificial Intelligence ---
  { id: 'prod-20', name: 'ChatGPT (GPT-5)', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "GPT", brandColor: '#74AA9C', description: 'Acceso renovable a la última versión del modelo de lenguaje más avanzado.' },
  { id: 'prod-gpt-account', name: 'ChatGPT por cuenta', category: Category.AI, priceUSD: 14.99, priceBS: 149, logo: "GA", brandColor: '#74AA9C', description: 'Cuenta privada y completa de ChatGPT para uso personal exclusivo.' },
  { id: 'prod-copilot', name: 'Copilot Pro', category: Category.AI, priceUSD: 3.00, priceBS: 30, logo: "CP", brandColor: '#F25022', description: 'Tu asistente de IA integrado en Microsoft 365 para impulsar tu creatividad.' },
  { id: 'prod-22', name: 'Midjourney', category: Category.AI, priceUSD: 6.00, priceBS: 60, logo: "MJ", brandColor: '#00A6FF', description: 'Generación de arte e imágenes hiperrealistas a partir de texto.' },
  { id: 'prod-did', name: 'D-ID AI', category: Category.AI, priceUSD: 4.00, priceBS: 40, logo: "DI", brandColor: '#121212', description: 'Crea videos con avatares parlantes realistas impulsados por IA.' },
  { id: 'prod-23', name: 'ElevenLabs', category: Category.AI, priceUSD: 4.00, priceBS: 40, logo: "11", brandColor: '#2C2C2C', description: 'Síntesis de voz realista y clonación de voz líder en la industria.' },

  // --- Security ---
  { id: 'prod-24', name: 'NOD32 Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "N32", brandColor: '#009CDE', description: 'Protección ligera y potente contra malware sin ralentizar tu PC.' },
  { id: 'prod-25', name: 'Kaspersky', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "K", brandColor: '#00A651', description: 'Seguridad premiada contra virus, ransomware y amenazas cibernéticas.' },
  { id: 'prod-norton', name: 'Norton Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "Nor", brandColor: '#F9D508', description: 'Defensa integral contra amenazas online con copia de seguridad en la nube.' },
  { id: 'prod-eset', name: 'ESET Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "E", brandColor: '#009CDE', description: 'Tecnología legendaria de seguridad digital para todos tus dispositivos.' },

  // --- Gaming & Subscriptions ---
  { id: 'prod-26', name: 'PlayStation Plus', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "PS", brandColor: '#0070D1', description: 'Juegos mensuales, multijugador online y descuentos exclusivos en PS Store.', soldOut: true },
  { id: 'prod-27', name: 'Xbox Game Pass', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "X", brandColor: '#107C10', description: 'Acceso ilimitado a más de 100 juegos de alta calidad para consola y PC.' },

  // --- Live TV & Sports ---
  { id: 'prod-28', name: 'MagisTV', category: Category.LIVE_TV_SPORTS, priceUSD: 4.60, priceBS: 46, logo: "Mag", brandColor: '#FF6F00', description: 'La mejor app de TV en vivo con cientos de canales y contenido VOD.' },
  { id: 'prod-iptv', name: 'IPTV', category: Category.LIVE_TV_SPORTS, priceUSD: 2.50, priceBS: 25, logo: "IP", brandColor: '#607D8B', description: 'Acceso económico a canales de televisión globales por internet.' },
  { id: 'prod-panel', name: 'Panel IPTV', category: Category.LIVE_TV_SPORTS, priceUSD: 4.20, priceBS: 42, logo: "PI", brandColor: '#455A64', description: 'Solución completa para gestionar y revender servicios de IPTV.' },

  // --- Lifestyle ---
  { id: 'prod-31', name: 'Membresía Black Smart Fit', category: Category.LIFESTYLE, priceUSD: 25.00, priceBS: 250, logo: "SF", brandColor: '#FFC72C', description: 'Entrena en cualquier sucursal de LATAM y lleva a un invitado contigo.' },
];

export const COMBOS: Combo[] = [
  { id: 'combo-1', name: 'Pack Cinéfilo', priceUSD: 8.10, priceBS: 81, included: ['Netflix', 'Disney+', 'Prime Video'], image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-2', name: 'Suite del Creador', priceUSD: 7.10, priceBS: 71, included: ['Canva Pro', 'CapCut Pro', 'ChatGPT+'], image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-3', name: 'Entretenimiento Total', priceUSD: 6.00, priceBS: 60, included: ['YouTube Premium', 'HBO Max', 'Paramount+'], image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-4', name: 'Trío de TV en Vivo', priceUSD: 16.20, priceBS: 162, included: ['MagisTV', 'DirecTV Go', 'Movistar Play'], image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
  { id: 'combo-5', name: 'Mix Internacional', priceUSD: 9.25, priceBS: 92.5, included: ['VIX', 'DramaBox', 'Crunchyroll'], image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&h=400&auto=format&fit=crop', category: Category.COMBOS },
];


export const WHATSAPP_NUMBER = '59162656572';
export const QR_CODE_URL = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STREAMIX_USD_PAYMENT'; // A reliable placeholder QR code.