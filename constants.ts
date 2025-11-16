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
  { id: 'prod-01', name: 'Netflix', category: Category.STREAMING_SERIES, priceUSD: 4.80, priceBS: 48, logo: "N", brandColor: '#E50914', description: 'Disfruta de películas, series y más sin límites. Netflix tiene una amplia biblioteca de largometrajes, documentales, series, anime, originales de Netflix galardonados y más.' },
  { id: 'prod-02', name: 'Disney+', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "D+", brandColor: '#113CCF', description: 'Las mejores historias de Disney, Pixar, Marvel, Star Wars y National Geographic, además de los originales de Star. Todo en un solo lugar.'},
  { id: 'prod-03', name: 'Star Plus', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "S+", brandColor: '#D83B92', description: 'Disfruta de los últimos estrenos, clásicos y originales exclusivos de Star, además de deportes en vivo de ESPN.' },
  { id: 'prod-04', name: 'Prime Video', category: Category.STREAMING_SERIES, priceUSD: 3.00, priceBS: 30, logo: "P", brandColor: '#00A8E1', description: 'Disfruta de películas, TV y deportes, incluyendo galardonados Amazon Originals. Disfruta en tus dispositivos favoritos.' },
  { id: 'prod-05', name: 'Paramount+', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "P+", brandColor: '#0064FF', description: 'Una montaña de entretenimiento. Descubre series originales, películas exitosas y deportes en vivo.' },
  { id: 'prod-06', name: 'Apple TV+', category: Category.STREAMING_SERIES, priceUSD: 4.00, priceBS: 40, logo: "A+", brandColor: '#000000', description: 'El hogar de los Apple Originals. Disfruta de series galardonadas, dramas cautivadores, documentales revolucionarios y entretenimiento para niños.' },
  { id: 'prod-07', name: 'HBO Max', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "M", brandColor: '#8A2BE2', description: 'Disfruta lo mejor de HBO, Warner Bros, DC, Cartoon Network y más. Todos tus favoritos en un solo lugar.' },
  { id: 'prod-08', name: 'Crunchyroll', category: Category.STREAMING_SERIES, priceUSD: 3.50, priceBS: 35, logo: "C", brandColor: '#F47521', description: 'La colección de anime más grande del mundo. Disfruta de nuevos episodios una hora después de su emisión en Japón y explora una vasta biblioteca de manga.' },
  { id: 'prod-09', name: 'VIX', category: Category.STREAMING_SERIES, priceUSD: 2.00, priceBS: 20, logo: "V", brandColor: '#FFC800', description: 'El servicio de streaming en español más grande del mundo. Disfruta de series originales, películas y deportes en vivo.' },
  { id: 'prod-10', name: 'Drama Box', category: Category.STREAMING_SERIES, priceUSD: 5.00, priceBS: 50, logo: "DB", brandColor: '#E60073', description: 'Una colección de series cortas y dramáticas, perfectas para ver sobre la marcha. Nuevos episodios añadidos diariamente.' },

  // Music
  { id: 'prod-11', name: 'Spotify', category: Category.MUSIC, priceUSD: 5.00, priceBS: 50, logo: "S", brandColor: '#1DB954', description: 'Música para todos. Escucha millones de canciones y podcasts sin anuncios. Reproduce en cualquier lugar, incluso sin conexión.' },
  { id: 'prod-12', name: 'Deezer', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "D", brandColor: '#EF5466', description: 'Tu compañero musical personal. Accede a más de 90 millones de canciones, podcasts y canales de radio.' },
  { id: 'prod-13', name: 'YouTube Premium', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YT", brandColor: '#FF0000', description: 'Disfruta de videos sin anuncios, reproducción en segundo plano y descargas. Incluye acceso a YouTube Music Premium.' },
  { id: 'prod-14', name: 'YouTube Music', category: Category.MUSIC, priceUSD: 3.00, priceBS: 30, logo: "YM", brandColor: '#FF0000', description: 'Un servicio de streaming de música de YouTube. Encuentra la música que te encanta y deja que YouTube Music te ayude a descubrir nuevos favoritos.' },

  // Education & Learning
  { id: 'prod-15', name: 'Duolingo', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "DL", brandColor: '#58CC02', description: 'Aprende un nuevo idioma gratis. Divertido, efectivo y respaldado por la ciencia. Potencia tu aprendizaje con Duolingo Plus.' },
  { id: 'prod-16', name: 'Canva Pro', category: Category.EDUCATION_LEARNING, priceUSD: 2.00, priceBS: 20, logo: "C", brandColor: '#8E44AD', description: 'Diseña lo que quieras. Canva Pro facilita la creación de diseños profesionales y la expansión de la identidad visual de tu marca.' },
  { id: 'prod-17', name: 'CapCut Pro', category: Category.EDUCATION_LEARNING, priceUSD: 2.50, priceBS: 25, logo: "CC", brandColor: '#00D68F', description: 'El editor de video todo en uno para todos. Crea videos impresionantes con herramientas potentes y fáciles de usar.' },
  { id: 'prod-18', name: 'Microsoft 365', category: Category.EDUCATION_LEARNING, priceUSD: 9.99, priceBS: 99, logo: "O", brandColor: '#D83B01', description: 'Tu nube de productividad. Obtén versiones premium de Word, Excel, PowerPoint, Outlook y más.' },
  { id: 'prod-19', name: 'Grammarly', category: Category.EDUCATION_LEARNING, priceUSD: 3.00, priceBS: 30, logo: "G", brandColor: '#15C79A', description: 'Escritura excelente, simplificada. Redacta textos audaces, claros y sin errores con el asistente de escritura con IA de Grammarly.' },

  // Artificial Intelligence
  { id: 'prod-20', name: 'ChatGPT+', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "GPT", brandColor: '#74AA9C', description: 'Obtén tiempos de respuesta más rápidos, acceso prioritario a nuevas funciones y más con ChatGPT Plus.' },
  { id: 'prod-21', name: 'Gemini (AI)', category: Category.AI, priceUSD: 5.00, priceBS: 50, logo: "G", brandColor: '#8E44AD', description: 'Potencia tu creatividad y productividad con Gemini Advanced, el modelo de IA más capaz de Google.' },
  { id: 'prod-22', name: 'Midjourney', category: Category.AI, priceUSD: 6.00, priceBS: 60, logo: "MJ", brandColor: '#00A6FF', description: 'Un laboratorio de investigación independiente que explora nuevos medios de pensamiento y expande los poderes imaginativos de la especie humana.' },
  { id: 'prod-23', name: 'ElevenLabs', category: Category.AI, priceUSD: 4.00, priceBS: 40, logo: "E", brandColor: '#2C2C2C', description: 'El software de voz con IA más realista y versátil que existe. Genera audio hablado de alta calidad en cualquier voz y estilo.' },

  // Security
  { id: 'prod-24', name: 'NOD32 Antivirus', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "N32", brandColor: '#009CDE', description: 'Tecnología antivirus legendaria. Protégete del ransomware y otros tipos de malware con la protección multicapa probada de ESET.' },
  { id: 'prod-25', name: 'Kaspersky', category: Category.SECURITY, priceUSD: 5.00, priceBS: 50, logo: "K", brandColor: '#00A651', description: 'Protección completa contra ciberamenazas. Obtén el poder de la protección con la galardonada seguridad de Kaspersky.' },

  // Gaming & Subscriptions
  { id: 'prod-26', name: 'PlayStation Plus', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "PS", brandColor: '#0070D1', description: 'Mejora tu experiencia PlayStation con multijugador en línea, juegos mensuales, descuentos exclusivos y más.' },
  { id: 'prod-27', name: 'Xbox Game Pass', category: Category.GAMING_SUBS, priceUSD: 5.00, priceBS: 50, logo: "X", brandColor: '#107C10', description: 'Obtén acceso a más de 100 juegos de alta calidad para consola, PC y dispositivos móviles. Se añaden nuevos juegos constantemente.' },

  // Live TV & Sports
  { id: 'prod-28', name: 'MagisTV', category: Category.LIVE_TV_SPORTS, priceUSD: 4.60, priceBS: 46, logo: "M", brandColor: '#FF6F00', description: 'Lo mejor de la televisión en vivo. Disfruta de cientos de canales de todo el mundo, además de una vasta biblioteca de contenido bajo demanda.' },
  { id: 'prod-29', name: 'DirecTV Go', category: Category.LIVE_TV_SPORTS, priceUSD: 10.00, priceBS: 100, logo: "DTV", brandColor: '#009FDB', description: 'TV en vivo y deportes dondequiera que estés. Sin necesidad de antena parabólica ni instalación.' },
  { id: 'prod-30', name: 'Movistar Play', category: Category.LIVE_TV_SPORTS, priceUSD: 7.00, priceBS: 70, logo: "MP", brandColor: '#00A9E0', description: 'Disfruta de canales en vivo, miles de películas y series bajo demanda, y contenido exclusivo.' },

  // Lifestyle
  { id: 'prod-31', name: 'Smart Fit Black', category: Category.LIFESTYLE, priceUSD: 25.00, priceBS: 250, logo: "SF", brandColor: '#FFC72C', description: 'La mejor experiencia de gimnasio. Acceso a todas las ubicaciones de Smart Fit, además de beneficios exclusivos para miembros Black.' },
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