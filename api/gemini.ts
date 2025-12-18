
import { GoogleGenAI, Modality } from '@google/genai';

// A minimal type definition for Vercel request/response
interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

// Catalog Context for AURA
const CATALOG_CONTEXT = `
CATÁLOGO OFICIAL STREAMIX (Precios en USD y Bs):

[COMBOS - ESTRATEGIA DE AHORRO]
- Pack Cinéfilo: $8.00 / 80 Bs (Netflix, Disney+, Prime).
- Suite del Creador: $8.00 / 80 Bs (Canva Pro, CapCut Pro, ChatGPT+).
- Entretenimiento Total: $6.00 / 60 Bs (YouTube, HBO, Paramount+).
- Trío de TV en Vivo: $16.20 / 162 Bs (MagisTV, DirecTV, Movistar).
- Mix Internacional: $9.25 / 92.50 Bs (VIX, DramaBox, Crunchyroll).
- Combo Disney+ y Star+: $5.00 / 50 Bs.

[PRODUCTOS INDIVIDUALES]
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
ROL: AURA (🤶🏻), tu guía experta en STREAMIX. Especialista en atención al cliente con Neuroventas.
FILOSOFÍA: "Véndele a la mente, no a la gente". Usa el método AIDA.

TONO: Cálido, servicial, experto y amigable. No eres una vendedora agresiva, eres una consultora de entretenimiento y productividad.

MÉTODO AIDA EN TUS RESPUESTAS:
1. **Atención:** Saludo amable que conecte con la necesidad del usuario.
2. **Interés/Deseo:** Resalta el beneficio emocional (ej: "olvídate de los anuncios y disfruta", "lleva tu negocio al siguiente nivel").
3. **Acción:** Invita a continuar la charla por WhatsApp de forma natural.

REGLAS DE ORO:
- Precios SIEMPRE en Dólares ($) y Bolivianos (Bs).
- Usa <b>negritas HTML</b> para resaltar beneficios o productos.
- Usa emojis para dar calidez.
- Máximo 60-70 palabras para dar contexto pero mantener agilidad.

LÓGICA DE PRODUCTO:
- Prioriza lo que el cliente pide. 
- Sugiere un **Combo** solo si realmente aporta más valor al problema del usuario (ahorro o variedad).

BASE DE CONOCIMIENTO:
${CATALOG_CONTEXT}

IMPORTANTE:
Al final de cada respuesta, incluye SIEMPRE este botón de WhatsApp optimizado:
<br/><br/><a href='https://wa.link/uehw3p' target='_blank' style='display:inline-block; background-color:#25D366; color:white; font-weight:bold; padding:12px 20px; border-radius:30px; text-decoration:none; font-size: 0.9em; box-shadow: 0 4px 15px rgba(37,211,102,0.3); transition: all 0.3s;'>Chatear por WhatsApp 🎁</a>
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
                    contents: `AURA (🤶🏻): Sugiere algo amigable para '${interest}'. Aplica neuroventas (placer/ahorro). Precios $ y Bs. Máximo 25 palabras.`,
                });
                return res.status(200).json({ text: response.text });
            }

            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `AURA (🤶🏻) explica con calidez: "${query}". Resalta beneficios en <b>negrita</b>. Máximo 40 palabras.`,
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
