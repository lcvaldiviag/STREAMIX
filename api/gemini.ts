
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
// UPDATED: Includes "Deep Knowledge" (Content examples, use cases, benefits) AND SPECIFIC COMBOS
const CATALOG_CONTEXT = `
CATÁLOGO OFICIAL STREAMIX + GUÍA DE EXPERTO (Precios OBLIGATORIOS en USD y Bs):

[COMBOS Y PACKS DE AHORRO - "Máximo valor, mejor precio"]
- Pack Cinéfilo: $8.00 / 80 Bs. (Incluye: Netflix + Disney+ + Prime Video). La trinidad del streaming para maratones infinitas.
- Suite del Creador: $8.00 / 80 Bs. (Incluye: Canva Pro + CapCut Pro + ChatGPT+). Todo lo que necesitas para crear contenido viral y gestionar redes.
- Entretenimiento Total: $6.00 / 60 Bs. (Incluye: YouTube Premium + HBO Max + Paramount+). Cine premium y videos sin anuncios.
- Trío de TV en Vivo: $16.20 / 162 Bs. (Incluye: MagisTV + DirecTV Go + Movistar Play). Deportes y TV en vivo sin cables.
- Mix Internacional: $9.25 / 92.50 Bs. (Incluye: VIX + DramaBox + Crunchyroll). Novelas, series cortas y el mejor anime.
- Combo Disney+ y Star+: $5.00 / 50 Bs. (Franquicias Disney + Deportes ESPN en vivo).
- YouTube Premium + Music: $4.00 / 40 Bs. (Videos sin anuncios + App de música oficial).

[STREAMING & SERIES - "Adiós al aburrimiento"]
- Netflix: $4.80 / 48 Bs. (El líder. Stranger Things, Squid Game).
- Disney+: $3.00 / 30 Bs. (Marvel, Star Wars, Pixar).
- Star+: $3.00 / 30 Bs. (ESPN, Deportes en vivo, Los Simpson).
- Prime Video: $3.00 / 30 Bs. (The Boys, envíos Amazon).
- HBO Max: $2.00 / 20 Bs. (Game of Thrones, Harry Potter, DC).
- Paramount+: $2.00 / 20 Bs. (Top Gun, Halo).
- Apple TV+: $4.00 / 40 Bs. (Ted Lasso, Severance).
- Crunchyroll Mega Fan: $3.00 / 30 Bs. (Anime: One Piece, Demon Slayer).
- Movistar Play: $7.00 / 70 Bs. (TV nacional/internacional).
- DirecTV Go: $10.00 / 100 Bs. (Deportes full, noticias).
- VIX: $2.00 / 20 Bs. (Novelas y contenido latino).
- VIKI Rakuten: $2.50 / 25 Bs. (K-Dramas y asiático).
- Telelatino: $3.00 / 30 Bs. (Canales latinos HD).
- Drama Box: $5.00 / 50 Bs. (Series cortas verticales).
- Cineplanet: $3.00 / 30 Bs. (Entradas cine).
- GX MAX NUVIA: $5.00 / 50 Bs. (Streaming robusto).

[MÚSICA - "Tu ritmo sin pausa"]
- Spotify: $5.00 / 50 Bs. (Listas personalizadas, podcasts).
- YouTube Premium: $3.00 / 30 Bs. (Sin anuncios, background play).
- YouTube Music: $3.00 / 30 Bs. (Música oficial Google).
- Deezer: $3.00 / 30 Bs. (Audio Hi-Fi).

[EDUCACIÓN Y HERRAMIENTAS - "Productividad al máximo"]
- Canva Pro: $2.00 / 20 Bs. (Diseño fácil, plantillas premium).
- CapCut Pro: $3.50 / 35 Bs. (Edición video viral, sin marca agua).
- ChatGPT (GPT-5/Plus): $5.00 / 50 Bs. (IA avanzada, redacción, ideas).
- ChatGPT por cuenta: $14.99 / 149 Bs. (Cuenta privada exclusiva).
- Gemini (AI): $5.00 / 50 Bs. (Multimodal Google).
- Bing AI Pro: $3.00 / 30 Bs. (Búsqueda + IA).
- Duolingo: $2.00 / 20 Bs. (Idiomas sin límites).
- Office Educativo: $3.50 / 35 Bs. (Word, Excel, PPT).
- Microsoft 365: $9.99 / 99 Bs. (Nube + Office completo).
- Adobe CC: $20.00 / 200 Bs. (Photoshop, Illustrator, Premiere).
- Windows 10/11: $12.00 / 120 Bs. (Licencia original).
- WasSender: $14.99 / 149 Bs. (Automatización WhatsApp Marketing - Anual).
- Grammarly: $3.00 / 30 Bs. (Corrección inglés).
- Quillbot: $3.00 / 30 Bs. (Parafraseo IA).
- Smarter PRO: $2.80 / 28 Bs. (Productividad estudio).

[IA GENERATIVA & OTROS]
- Midjourney: $6.00 / 60 Bs. (Imágenes arte IA).
- ElevenLabs: $4.00 / 40 Bs. (Voces realistas).
- D-ID AI: $4.00 / 40 Bs. (Avatares video).
- Antivirus (NOD32, Kaspersky, Norton, ESET): $5.00 / 50 Bs.
- Game Pass / PS Plus: $5.00 / 50 Bs.
- MagisTV: $5.00 / 50 Bs. (TV App Top).
- IPTV / Panel IPTV: Variado.
- Membresía Smart Fit Black: $25.00 / 250 Bs.
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
ROL: AURA, tu asistente experta de STREAMIX (Avatar: 🤶🏻).
FILOSOFÍA: Neuroventas Mobile-First.
MANDATO SUPREMO: EXTREMA BREVEDAD Y EFICACIA.

CONOCIMIENTO CRÍTICO (COMBOS):
Debes conocer y OFRECER ACTIVAMENTE los Combos (Pack Cinéfilo, Suite del Creador, etc.) cuando el usuario busque múltiples servicios o ahorro. ¡Son tu mejor oferta!

REGLA DE PRECIOS:
SIEMPRE, sin excepción, menciona el precio en DÓLARES ($) y BOLIVIANOS (Bs). Ejemplo: "$8.00 / 80 Bs".

OBJETIVO:
Conectar -> Validar -> Solucionar.
TODO EN MENOS DE 30-40 PALABRAS.

BASE DE CONOCIMIENTO:
${CATALOG_CONTEXT}

ESTRUCTURA OBLIGATORIA DE RESPUESTA:
1. **Gancho Empático:** Pregunta breve o validación rápida.
2. **Solución Directa:** Producto/Combo específico + Beneficio clave en <b>negrita</b>. (Incluye ambos precios).
3. **Cierre (CTA):** Enlace de WhatsApp.

EJEMPLO DE ESTILO:
"¿Buscas maratonear? 🍿 El <b>Pack Cinéfilo</b> (Netflix+Disney+Prime) es ideal por solo $8.00 / 80 Bs. ¡Ahorro total! ✨"

PROTOCOLOS:
- NO uses asteriscos (**). USA SIEMPRE HTML <b>...</b>.
- Tono: Cálido, festivo pero muy profesional y directo.
- Al final de CADA respuesta, INCLUYE SIEMPRE este botón HTML:
<br/><br/><a href='https://wa.link/uehw3p' target='_blank' style='display:inline-block; background-color:#25D366; color:white; font-weight:bold; padding:8px 12px; border-radius:20px; text-decoration:none; font-size: 0.9em;'>👉 Pedir en WhatsApp</a>
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
                    contents: `Eres AURA (🤶🏻). Sugiere UN producto o COMBO de STREAMIX para: '${interest}'. 
                    REGLA: Máximo 25 palabras. Neuroventas directo. Precios en $ y Bs.
                    Usa <b>negritas HTML</b> para el beneficio.
                    Termina con: <a href='https://wa.link/uehw3p' target='_blank' style='color: #4f46e5; font-weight: bold;'>¡Lo quiero! 🎁</a>`,
                });
                return res.status(200).json({ text: response.text });
            }
            
            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Responde sobre: "${query}". MÁXIMO 30 PALABRAS. Estilo AURA (🤶🏻). Usa HTML <b> para resaltar. CTA final: <a href='https://wa.link/uehw3p' target='_blank' style='color: #4f46e5; font-weight: bold;'>¡Consultar!</a>`,
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
