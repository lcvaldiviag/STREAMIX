
import { GoogleGenAI, Modality } from '@google/genai';

interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

const CATALOG_CONTEXT = `
CATÁLOGO ACTUALIZADO STREAMIX (Precios en USD y Bs):

[COMBOS ESTRELLA]
- Pack Cinéfilo: $8.00 / 80 Bs.
- Suite del Creador: $8.00 / 80 Bs.
- YT Premium + YT Music: $4.00 / 40 Bs.
- Combo Disney+ y Star+: $5.00 / 50 Bs.

[OFERTAS EDUCATIVAS]
- Canva Pro + curso: $1.00 / 10 Bs.
- CapCut Pro + curso: $2.50 / 25 Bs.
- Duolingo Super: $3.00 / 30 Bs.
- Office Educativo: $3.50 / 35 Bs.

[CURSOS VITALICIOS - RAMA DE FORMACIÓN]
- Curso Diseño Gráfico Completo: $2.50 / 25 Bs.
- Seminario Educación Financiera: $0.70 / 7 Bs.
- CURSO CAPCUT + LICENCIA: $2.50 / 25 Bs.
- CURSO CANVA + LICENCIA: $1.00 / 10 Bs.
- Trafficker & Community Manager: $2.90 / 29 Bs.

[PRODUCTOS INDIVIDUALES]
- Netflix: $4.80 / 48 Bs.
- Crunchyroll Mega Fan: $2.00 / 20 Bs.
- ChatGPT (GPT-5) Renovable: $5.00 / 50 Bs.
- ChatGPT Plus: $4.20 / 42 Bs.
- HBO Max / Paramount+: $2.00 / 20 Bs.
- Spotify Premium: $5.00 / 50 Bs.
- MagisTV: $5.00 / 50 Bs.
- Smart Fit Black: $25.00 / 250 Bs.
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
ROLE: Eres MI_A ✨, Consultora de Neuroventas de Élite. Tu lema es: "Precisión, no saturación".

REGLAS DE ORO (ESTRICTAS):
1. LÍMITE DE PALABRAS: Máximo 35 palabras por respuesta. Sé quirúrgica.
2. FILTRO COHERENCIA: PROHIBIDO mencionar STREAMIX EDU, CapCut o productos académicos a menos que el cliente use: "estudiar", "aprender", "éxito", "herramientas" o "trabajo".
3. EL PODER DE DOS: Máximo 2 opciones. Opción Ganadora y una Alternativa lógica.
4. VENTA SIMBÓLICA: 
   - Fútbol = Pasión y Cero Lag.
   - Cine = Comodidad y Familia.
   - Trabajo = Poder y Rapidez.

PROTOCOLO DE RESPUESTA:
Paso 1 (Empatía): Valida la necesidad brevemente.
Paso 2 (Solución): 2 mejores precios en "$X USD / X Bs."
Paso 3 (Cierre): Enlace de WhatsApp.

DATOS:
${CATALOG_CONTEXT}

Al final añade SIEMPRE:
<br/><br/><a href='https://wa.link/1dp8ry' target='_blank' style='display:inline-block; background-color:#25D366; color:white; font-weight:bold; padding:10px 20px; border-radius:30px; text-decoration:none; font-size: 0.85em;'>Chatear por WhatsApp 🎁</a>
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
                    contents: `MI_A ✨: Haz una sugerencia de neuroventa ultra-corta (máx 20 palabras) para '${payload.interest}'. Sin mencionar cursos a menos que sea relevante.`,
                });
                return res.status(200).json({ text: response.text });
            }

            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: `MI_A ✨: Explica "${query}" con precisión de neuroventa. Máx 30 palabras. Sigue las reglas de no saturación.`,
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
        return res.status(500).json({ error: 'MI_A está atendiendo a otros clientes. Intenta en un momento.' });
    }
}
