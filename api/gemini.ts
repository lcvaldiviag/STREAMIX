
import { GoogleGenAI, Modality } from '@google/genai';

// A minimal type definition for Vercel request/response to avoid needing @vercel/node
interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

// Catalog Context for AURA - Structured for Neuro-Sales
const CATALOG_CONTEXT = `
CATÁLOGO OFICIAL STREAMIX (Precios en USD y Bs):

[COMBOS - ESTRATEGIA DE AHORRO]
- Pack Cinéfilo: $8.00 / 80 Bs (Netflix, Disney+, Prime).
- Suite del Creador: $8.00 / 80 Bs (Canva Pro, CapCut Pro, ChatGPT+).
- Entretenimiento Total: $6.00 / 60 Bs (YouTube, HBO, Paramount+).
- Trío de TV en Vivo: $16.20 / 162 Bs (MagisTV, DirecTV, Movistar).
- Mix Internacional: $9.25 / 92.50 Bs (VIX, DramaBox, Crunchyroll).
- Combo Disney+ y Star+: $5.00 / 50 Bs.

[PRODUCTOS INDIVIDUALES - PRECISIÓN]
- Netflix: $4.80 / 48 Bs.
- Disney+, Star+, Prime Video, Crunchyroll, HBO Max: $3.00 / 30 Bs (promedio).
- YouTube Premium: $3.00 / 30 Bs.
- Spotify: $5.00 / 50 Bs.
- ChatGPT Pro / Gemini: $5.00 / 50 Bs.
- Canva Pro: $2.00 / 20 Bs.
- MagisTV: $5.00 / 50 Bs.
- Smart Fit Black: $25.00 / 250 Bs.
- WasSender (Marketing): $14.99 / 149 Bs.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!process.env.API_KEY) {
        return res.status(500).json({ error: 'AI service not configured.' });
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
ROL: AURA (🤶🏻), Concierge de STREAMIX. Especialista en Neuroventas.
MISIÓN: Guiar al cliente al cierre en WhatsApp de forma persuasiva y breve.

LÓGICA DE PRODUCTO:
1. Si el usuario pregunta por algo ESPECÍFICO (ej: Netflix), ofrece Netflix primero.
2. Menciona un COMBO únicamente si el usuario pide "ahorro", "varios servicios" o si su pedido encaja perfectamente en un pack existente como recomendación inteligente.
3. No satures con los combos; son herramientas de valor, no tu único argumento.

TÁCTICA DE NEUROVENTAS:
- No vendas "cuentas", vende "acceso instantáneo al entretenimiento premium".
- Usa disparadores: "activación inmediata", "mejor precio garantizado", "disfruta hoy mismo".
- Precios SIEMPRE en Dólares ($) y Bolivianos (Bs).

ESTRUCTURA DE RESPUESTA (Máximo 40 palabras):
1. **Conexión:** "¡Excelente elección!" o "¿Listo para el mejor contenido?".
2. **Oferta Directa:** Producto + Precios ($/Bs) + Beneficio en <b>negrita</b>.
3. **CTA Persuasivo:** Un texto que invite a la acción inmediata.

EJEMPLO:
"¡Netflix es la mejor opción para tus maratones! 🍿 Por solo $4.80 / 48 Bs tendrás <b>acceso 4K inmediato</b>. ¿Te lo activo ahora? ✨"

BASE DE CONOCIMIENTO:
${CATALOG_CONTEXT}

IMPORTANTE:
- Usa HTML <b> para beneficios.
- Al final de cada respuesta, añade el botón de WhatsApp:
<br/><br/><a href='https://wa.link/uehw3p' target='_blank' style='display:inline-block; background-color:#25D366; color:white; font-weight:bold; padding:10px 16px; border-radius:24px; text-decoration:none; font-size: 0.85em; box-shadow: 0 4px 12px rgba(37,211,102,0.3);'>⚡ ACTIVAR POR WHATSAPP</a>
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
                    model: 'gemini-flash-lite-latest',
                    contents: `AURA (🤶🏻): Sugiere algo para '${interest}'. Máximo 20 palabras. Neuroventas puro. Precios $ y Bs. CTA: <a href='https://wa.link/uehw3p' target='_blank' style='color: #4f46e5; font-weight: bold;'>¡Lo quiero!</a>`,
                });
                return res.status(200).json({ text: response.text });
            }

            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Explica brevemente: "${query}". Máximo 30 palabras. Estilo AURA (🤶🏻). CTA: <a href='https://wa.link/uehw3p' target='_blank' style='color: #4f46e5; font-weight: bold;'>Consultar</a>`,
                    config: { tools: [{googleSearch: {}}] },
                });
                const text = response.text;
                const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                const sources = rawChunks.map((c: any) => ({ uri: c.web?.uri || '', title: c.web?.title || 'Fuente' })).filter((s: any) => s.uri);
                return res.status(200).json({ text, sources });
            }

            default:
                return res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred.' });
    }
}
