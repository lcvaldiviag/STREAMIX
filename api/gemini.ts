
import { GoogleGenAI, Modality } from '@google/genai';

interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

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
- Disney+, Star+, Prime Video, Crunchyroll, HBO Max: $3.00 / 30 Bs.
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
        return res.status(500).json({ error: 'Falta configuración de API.' });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const { action, payload } = req.body;

        switch (action) {
            case 'chat': {
                const { history, newMessage } = payload;
                
                // --- LIMPIEZA ROBUSTA DE HISTORIAL PARA EVITAR ERRORES ---
                // 1. Asegurar que el historial alterne estrictamente User -> Model
                // 2. Eliminar mensajes iniciales si son del 'model'
                let sanitizedHistory = (history || []).filter((msg: any) => msg.role === 'user' || msg.role === 'model');
                
                let finalHistory = [];
                let lastRole = null;

                for (const msg of sanitizedHistory) {
                    if (msg.role !== lastRole) {
                        finalHistory.push({
                            role: msg.role,
                            parts: msg.parts
                        });
                        lastRole = msg.role;
                    }
                }

                // Si el primer mensaje es del modelo, lo quitamos (Gemini exige empezar con User)
                if (finalHistory.length > 0 && finalHistory[0].role === 'model') {
                    finalHistory.shift();
                }

                const chat = ai.chats.create({
                    model: 'gemini-3-flash-preview',
                    config: {
                        systemInstruction: `
ROL: Eres AURA (🤶🏻), la concierge de STREAMIX. Escribes desde el corazón y la psicología del cliente.
MISIÓN: Aplicar NEUROVENTAS ("Véndele a la mente") y el MÉTODO AIDA.

TONO: Dulce, profesional, empático y relajado. No presionas, invitas.

PASOS AIDA PARA TUS RESPUESTAS:
1. ATENCIÓN: Valida la emoción del cliente ("¡Qué buena elección!", "Entiendo perfectamente lo que buscas").
2. INTERÉS: Menciona cómo el producto mejora su vida (confort, ahorro de tiempo, alegría familiar).
3. DESEO: Usa palabras que evoquen placer ("Imagínate disfrutando...", "Olvida los límites con..."). Usa <b>negritas</b>.
4. ACCIÓN: Invita a conversar por WhatsApp de forma natural.

REGLAS ESTRATÉGICAS:
- Precios SIEMPRE en Dólares ($) y Bolivianos (Bs).
- Longitud: 60-80 palabras para sonar humana y cercana.
- Usa Emojis para transmitir calidez 🍿✨🎬.
- Si piden algo específico, dales eso primero. No empujes los combos a menos que sea para ayudarles a ahorrar de verdad.

DATOS:
${CATALOG_CONTEXT}

IMPORTANTE:
Al final de tu respuesta, añade SIEMPRE este botón:
<br/><br/><a href='https://wa.link/uehw3p' target='_blank' style='display:inline-block; background-color:#25D366; color:white; font-weight:bold; padding:12px 24px; border-radius:30px; text-decoration:none; font-size: 0.95em; box-shadow: 0 4px 15px rgba(37,211,102,0.3);'>Chatear por WhatsApp 🎁</a>
`,
                    },
                    history: finalHistory,
                });

                const result = await chat.sendMessage({ message: newMessage });
                return res.status(200).json({ text: result.text });
            }

            case 'suggest': {
                const { interest } = payload;
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: `AURA (🤶🏻): Haz una sugerencia muy cálida y con neuroventas para alguien interesado en '${interest}'. Precios en $ y Bs. Máximo 35 palabras.`,
                });
                return res.status(200).json({ text: response.text });
            }

            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: `AURA (🤶🏻) explica con mucha paciencia y calidez: "${query}". Usa <b>negritas</b> para los beneficios. Máximo 50 palabras.`,
                    config: { tools: [{googleSearch: {}}] },
                });
                const text = response.text;
                const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                const sources = rawChunks.map((c: any) => ({ uri: c.web?.uri || '', title: c.web?.title || 'Fuente' })).filter((s: any) => s.uri);
                return res.status(200).json({ text, sources });
            }

            default:
                return res.status(400).json({ error: 'Acción inválida' });
        }
    } catch (error: any) {
        console.error("Critical Gemini Error:", error);
        // Si hay un error de "safety", damos una respuesta amable
        if (error.message?.includes('safety')) {
            return res.status(200).json({ text: "¡Hola! Como tu concierge, prefiero mantener nuestra charla enfocada en cómo STREAMIX puede mejorar tu día con el mejor entretenimiento. 😊 ¿Hablamos de alguna suscripción?" });
        }
        return res.status(500).json({ error: 'AURA está tomando un respiro técnico. Por favor, intenta de nuevo en un momento.' });
    }
}
