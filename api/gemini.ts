
import { GoogleGenAI, Modality } from '@google/genai';

// A minimal type definition for Vercel request/response to avoid needing @vercel/node
interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

// Condensed Catalog Context for System Prompt based on constants.ts
// UPDATED: Includes "Deep Knowledge" (Content examples, use cases, benefits)
const CATALOG_CONTEXT = `
CATÁLOGO OFICIAL STREAMIX (Precios USD / BS) + GUÍA DE EXPERTO EN CONTENIDO:

[STREAMING & SERIES - "Adiós al aburrimiento, entretenimiento premium"]
- Netflix: $4.80 / 48 Bs. (El Rey del Streaming. Catálogo inmenso, series originales premiadas como Stranger Things, Squid Game. Ideal para maratones y variedad total).
- Disney+: $3.00 / 30 Bs. (Hogar exclusivo de Marvel, Star Wars, Pixar y Disney. Ideal para familias y fans de superhéroes. Ej: Avengers, Mandalorian).
- Star+: $3.00 / 30 Bs. (Deportes en vivo ESPN: F1, Champions, NBA, UFC. Series adultas como Los Simpson, Grey's Anatomy).
- Combo Disney+ y Star+: $5.00 / 50 Bs. (La combinación definitiva: Deportes en vivo + Franquicias épicas. Ahorro máximo).
- HBO Max: $2.00 / 20 Bs. (Calidad prestigio. Game of Thrones, Harry Potter, DC Comics (Batman/Superman), estrenos de cine Warner).
- Prime Video: $3.00 / 30 Bs. (Originales como The Boys, envíos Amazon. Excelente relación calidad/precio).
- Paramount+: $2.00 / 20 Bs. (Top Gun, Halo, series exclusivas. Entretenimiento estelar).
- Apple TV+: $4.00 / 40 Bs. (Calidad sobre cantidad. Ted Lasso, Severance. Producciones impecables y galardonadas).
- Crunchyroll Mega Fan: $3.50 / 35 Bs. (La meca del Anime. One Piece, Demon Slayer, Jujutsu Kaisen. Sin anuncios, estreno simultáneo con Japón).
- Movistar Play: $7.00 / 70 Bs. (TV en vivo local e internacional + catálogo on-demand).
- DirecTV Go: $10.00 / 100 Bs. (Deportes y noticias en vivo, sin cables ni contratos).
- VIX: $2.00 / 20 Bs. (La casa de las novelas y contenido en español).
- VIKI Rakuten: $2.50 / 25 Bs. (Dramas coreanos/asiáticos - K-Dramas).
- Telelatino: $3.00 / 30 Bs. (Cientos de canales latinos en vivo en HD).
- Drama Box: $5.00 / 50 Bs. (Series cortas adictivas formato vertical).
- Cineplanet: $3.00 / 30 Bs. (Entradas/códigos para estrenos en cine).

[MÚSICA - "Tu banda sonora sin interrupciones"]
- Spotify: $5.00 / 50 Bs. (Listas personalizadas, podcasts, el mejor algoritmo de descubrimiento. La opción #1 del mundo).
- YouTube Premium: $3.00 / 30 Bs. (Adiós a los anuncios en todo YouTube. Reproducción en segundo plano y descargas).
- YouTube Music: $3.00 / 30 Bs. (Solo la app de música de Google).
- Deezer: $3.00 / 30 Bs. (Audio de alta fidelidad, Flow único).

[EDUCACIÓN Y HERRAMIENTAS - "Potencia tu productividad y creatividad"]
- Canva Pro: $2.00 / 20 Bs. (Diseño profesional para NO diseñadores. Quita fondos con un clic, millones de plantillas premium. Ahorra tiempo y dinero).
- CapCut Pro: $3.50 / 35 Bs. (Edición viral para TikTok/Reels. Efectos pro, sin marca de agua, subtítulos auto. Crea contenido viral en minutos).
- ChatGPT (GPT-5/Plus): $5.00 / 50 Bs. (Tu segundo cerebro. Redacta correos, resume textos, genera ideas, programa código. Ahorra horas de trabajo mental).
- Duolingo: $2.00 / 20 Bs. (Aprende idiomas jugando. Vidas ilimitadas, sin anuncios).
- Office Educativo / Microsoft 365: Desde $3.50 / 35 Bs. (Word, Excel, PowerPoint. Esencial para estudiantes y trabajo).
- Adobe CC: $20.00 / 200 Bs. (Photoshop, Illustrator, Premiere. El estándar de la industria creativa).
- Windows 10 / 11: $12.00 / 120 Bs. (Licencia original. Seguridad y actualizaciones garantizadas).
- WasSender: $14.99 / 149 Bs. (Automatización de WhatsApp. Escala tus ventas masivamente).
- Grammarly: $3.00 / 30 Bs. (Corrección de estilo en inglés profesional).
- Quillbot: $3.00 / 30 Bs. (Parafraseo con IA. Evita plagio, mejora redacción académica).

[IA GENERATIVA]
- Midjourney: $6.00 / 60 Bs. (Crea imágenes artísticas impresionantes desde texto).
- ElevenLabs: $4.00 / 40 Bs. (Las voces más realistas del mundo para tus videos/narraciones).
- D-ID AI: $4.00 / 40 Bs. (Avatares parlantes).

[SEGURIDAD & GAMING]
- Antivirus (NOD32, Kaspersky, etc.): $5.00 / 50 Bs. (Protección total).
- Game Pass / PS Plus: $5.00 / 50 Bs. (Cientos de juegos por el precio de uno).
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!process.env.API_KEY) {
        console.error("API_KEY not configured on server.");
        return res.status(500).json({ error: 'AI service is not configured correctly.' });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const { action, payload } = req.body;

        switch (action) {
            case 'chat': {
                const { history, newMessage } = payload;
                const chat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `
ROL: AURA, Asistente en STREAMIX.
(Internamente actúas con estrategias de Neuroventas, pero NUNCA te presentes con términos técnicos como "Especialista en Neuroventas" o "Agente de Conversión" ante el usuario. Sé natural, directa y servicial).

OBJETIVO:
No solo des precios. Tu trabajo es realizar una INVESTIGACIÓN ACTIVA de la necesidad del usuario, identificar su "dolor" (aburrimiento, falta de tiempo, necesidad de profesionalismo) y prescribir la solución exacta del catálogo STREAMIX.

BASE DE CONOCIMIENTO (CATÁLOGO + CONTENIDO):
${CATALOG_CONTEXT}

PROTOCOLOS DE INTERACCIÓN (ESTILO NEUROVENTAS):

1. **IDENTIFICAR EL DOLOR Y VENDER LA SOLUCIÓN:**
   - Si el usuario dice: "Quiero ver películas". -> Tú investigas: "¿Buscas estrenos recientes (HBO/Cineplanet) o variedad infinita (Netflix)?"
   - Si el usuario dice: "Necesito editar videos". -> Tú vendes: "Para resultados virales y rápidos, **CapCut Pro** ($3.50) es tu mejor aliado. Ahorras horas de edición."
   - Si el usuario dice: "Tengo que hacer una tesis". -> Tú vendes: "**ChatGPT** ($5.00) para investigar y **Quillbot** ($3.00) para redacción académica son el combo perfecto para terminar en tiempo récord."

2. **CONOCIMIENTO PROFUNDO DEL PRODUCTO:**
   - Demuestra que sabes lo que vendes. Menciona series específicas (Game of Thrones en HBO, Marvel en Disney+), funciones específicas (Quitar fondo en Canva, Subtítulos auto en CapCut).
   - Usa esto para generar autoridad y confianza.

3. **LENGUAJE REPTIL:**
   - Usa palabras gatillo: "Garantizado", "Inmediato", "Seguro", "Ahorro", "Exclusivo", "Sin límites".
   - "Activa tu cuenta AHORA y empieza a disfrutar al instante."

4. **REGLA DE ORO (CTA - CIERRE DE VENTA):**
   - Al final de CADA respuesta, DEBES incluir este enlace HTML exacto:
   <br/><br/><a href='https://wa.link/uehw3p' target='_blank' style='display:inline-block; background-color:#25D366; color:white; font-weight:bold; padding:8px 12px; border-radius:20px; text-decoration:none;'>👉 Activar Cuenta con Soporte Humano</a>

TONO:
Concisa, empática, proactiva y segura. Eres la guía definitiva en el mundo digital.
`,
                    },
                    history: history || [],
                });
                const result = await chat.sendMessage({ message: newMessage });
                return res.status(200).json({ text: result.text });
            }

            case 'suggest': {
                const { interest } = payload;
                const response = await ai.models.generateContent({
                    model: 'gemini-flash-latest',
                    contents: `Eres una experta en ventas (no uses términos técnicos). Basado en el interés '${interest}', sugiere UN producto de STREAMIX (${CATALOG_CONTEXT}) que solucione un problema o satisfaga un deseo profundo. Vende el beneficio, no la característica. Termina con: <a href='https://wa.link/uehw3p' target='_blank' style='color: #4f46e5; font-weight: bold;'>¡Obtener Oferta en WhatsApp!</a>`,
                });
                return res.status(200).json({ text: response.text });
            }
            
            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Responde sobre: "${query}". Sé breve y útil. Al final: <a href='https://wa.link/uehw3p' target='_blank' style='color: #4f46e5; font-weight: bold;'>¡Consultar en WhatsApp!</a>`,
                    config: {
                        tools: [{googleSearch: {}}],
                    },
                });

                const text = response.text;
                const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                const sources: { uri: string; title: string }[] = rawChunks
                  .map((chunk: any) => ({
                    uri: chunk.web?.uri || '',
                    title: chunk.web?.title || 'Fuente',
                  }))
                  .filter((source: { uri: string; }) => source.uri);
                
                const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());
                return res.status(200).json({ text, sources: uniqueSources });
            }
            
            case 'editImage': {
                const { base64ImageData, mimeType, prompt } = payload;
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-image',
                    contents: {
                        parts: [
                            { inlineData: { data: base64ImageData, mimeType: mimeType } },
                            { text: prompt },
                        ],
                    },
                    config: {
                        responseModalities: [Modality.IMAGE],
                    },
                });

                for (const part of response.candidates?.[0]?.content?.parts || []) {
                    if (part.inlineData) {
                        return res.status(200).json({ text: part.inlineData.data }); // text is the base64 string
                    }
                }
                return res.status(500).json({ error: 'AI did not return an image.' });
            }

            default:
                return res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        console.error(`Error in API handler for action: ${req.body?.action}`, error);
        return res.status(500).json({ error: 'An error occurred while communicating with the AI.' });
    }
}
