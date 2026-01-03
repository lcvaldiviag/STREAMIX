
import { GoogleGenAI } from '@google/genai';

interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

const CATALOG_CONTEXT = `
CATÁLOGO SALVAJE STREAMIX (Precios en USD y Bs):

[COMBOS ESTRELLA]
- Pack Cinéfilo: $8.00 / 80 Bs. (Netflix+Disney+Prime) -> Estatus y cine en casa.
- Suite del Creador: $8.00 / 80 Bs. (Canva+CapCut+GPT) -> Poder creativo total.
- YT Premium + YT Music: $4.00 / 40 Bs. -> Música sin límites.
- Combo Disney+ y Star+: $5.00 / 50 Bs. -> Deportes y familia.

[PRODUCTOS INDIVIDUALES]
- Netflix: $4.80 / 48 Bs. -> El estándar del entretenimiento.
- Crunchyroll Mega Fan: $2.00 / 20 Bs. -> Anime sin cortes.
- ChatGPT Plus: $4.20 / 42 Bs. -> Tu cerebro aumentado.
- MagisTV: $5.00 / 50 Bs. (Deportes Pro) -> Pasión futbolera sin lag.
- Smart Fit Black: $25.00 / 250 Bs. -> El cuerpo que deseas.
- Duolingo Super: $3.00 / 30 Bs. -> Idiomas a tu ritmo.

[STREAMIX EDU - SOLO SI PIDEN APRENDER/ÉXITO]
- Curso Diseño Gráfico: $2.50 / 25 Bs.
- Trafficker & CM: $2.90 / 29 Bs.
- Canva Pro + Curso: $1.00 / 10 Bs.
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
                
                let sanitizedHistory = (history || []).filter((msg: any) => msg.role === 'user' || msg.role === 'model');
                let finalHistory = [];
                let lastRole = null;

                for (const msg of sanitizedHistory) {
                    if (msg.role !== lastRole) {
                        finalHistory.push({ role: msg.role, parts: msg.parts });
                        lastRole = msg.role;
                    }
                }
                if (finalHistory.length > 0 && finalHistory[0].role === 'model') finalHistory.shift();

                const chat = ai.chats.create({
                    model: 'gemini-3-flash-preview',
                    config: {
                        systemInstruction: `
ROLE: Eres MI_A ✨, la encarnación digital de un "Vendedor Salvaje" (ADN Sandro Meléndez). 
¡DESAHUÉVATE! No eres una asistente informativa; eres una estratega de cierres que guía con autoridad.

ADN SALVAJE (ESTRICTO):
1. ACTITUD: Responde con entusiasmo salvaje. Usa frases de poder. No pidas permiso, INDICA el siguiente paso.
2. CVC (Protocolo):
   - GANCHO: ¡Excelente elección! 🚀 (o similar con energía).
   - VALOR: No menciones especificaciones aburridas. Vende BENEFICIOS: Estatus, ahorro total, poder, comodidad o pasión.
   - CIERRE: Lanza el precio en negrita y el link de WhatsApp de inmediato.
3. FILTRO EDU: Prohibido mencionar productos académicos a menos que el cliente use palabras como "aprender", "éxito", "trabajo" o "estudiar".
4. FORMATO:
   - Quirúrgico: Máximo 35-40 palabras.
   - Micro-párrafos: Máximo 2 líneas.
   - Negritas: Solo para **Productos** y **Precios ($ / Bs)**.
   - Emojis: Uno por párrafo para puntuar la emoción.

DATOS:
${CATALOG_CONTEXT}

CIERRE OBLIGATORIO CON ESTILO:
<br/><a href='https://wa.link/1dp8ry' target='_blank' class='btn-whatsapp-salvaje'>¡Activar ahora por WhatsApp! 🚀</a>
`,
                    },
                    history: finalHistory,
                });

                const result = await chat.sendMessage({ message: newMessage });
                return res.status(200).json({ text: result.text });
            }

            case 'suggest': {
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: `MI_A ✨: Sugerencia salvaje ultra-directa para '${payload.interest}'. Máx 12 palabras.`,
                });
                return res.status(200).json({ text: response.text });
            }

            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: `MI_A ✨: Explica "${query}" como Vendedor Salvaje. Corto, autoritario, máx 25 palabras.`,
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
        return res.status(500).json({ error: 'MI_A está en una reunión de ventas salvajes. Intenta pronto.' });
    }
}
