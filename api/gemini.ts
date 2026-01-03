
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

[OFERTAS EDUCATIVAS - ¡EDICIÓN ILIMITADA!]
- Canva Pro + curso: $1.00 / 10 Bs (Licencia PRO x 30 días + curso de diseño. Acceso vitalicio al curso vía DRIVE en tu correo).
- CapCut Pro + curso: $2.50 / 25 Bs (Licencia PRO x 30 días + curso de edición. Acceso vitalicio al curso vía DRIVE en tu correo).
- Duolingo Super: $3.00 / 30 Bs.
- Office Educativo: $3.50 / 35 Bs.

[CURSOS - RAMA DE FORMACIÓN]
- Curso Diseño Gráfico Completo: $2.50 / 25 Bs (Incluye instaladores y recursos vitalicios).
- Seminario Educación Financiera: $0.70 / 7 Bs (Grabación + plantillas vitalicias).
- CURSO CAPCUT + LICENCIA GRATIS: $2.50 / 25 Bs (Curso de edición vitalicio + licencia).
- CURSO CANVA + LICENCIA GRATIS: $1.00 / 10 Bs (Curso de diseño vitalicio + licencia).
- Trafficker & Community Manager 2 en 1: $2.90 / 29 Bs (Formación completa vitalicia).
*Nota: En la categoría CURSOS el acceso al conocimiento es DE POR VIDA.*

[PRODUCTOS DESTACADOS]
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
                        finalHistory.push({
                            role: msg.role,
                            parts: msg.parts
                        });
                        lastRole = msg.role;
                    }
                }

                if (finalHistory.length > 0 && finalHistory[0].role === 'model') {
                    finalHistory.shift();
                }

                const chat = ai.chats.create({
                    model: 'gemini-3-flash-preview',
                    config: {
                        systemInstruction: `
ROL: Eres MI_A (✨), la asistente IA inteligente de STREAMIX.
MISIÓN: Aplicar NEUROVENTAS y MÉTODO AIDA. Eres experta en el catálogo.

NOVEDAD IMPORTANTE:
- Ahora ofrecemos formación profesional bajo la rama "CURSOS".
- Los productos de la categoría CURSOS ofrecen ACCESO VITALICIO a contenido en Drive.
- Algunos packs incluyen licencias de software por tiempo limitado, pero la formación es PARA SIEMPRE.
- Ejemplo: "CURSO CANVA + LICENCIA GRATIS" por solo $1.00.

TONO: Dulce, moderno y persuasivo. Usa <b>negritas</b> para beneficios.
PASOS AIDA: Atención, Interés, Deseo (enfócate en el valor del aprendizaje vitalicio) y Acción (enlace de WhatsApp).

DATOS DE REFERENCIA:
${CATALOG_CONTEXT}

IMPORTANTE:
Al final de tu respuesta, añade SIEMPRE este botón:
<br/><br/><a href='https://wa.link/1dp8ry' target='_blank' style='display:inline-block; background-color:#25D366; color:white; font-weight:bold; padding:12px 24px; border-radius:30px; text-decoration:none; font-size: 0.95em; box-shadow: 0 4px 15px rgba(37,211,102,0.3);'>Chatear por WhatsApp 🎁</a>
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
                    contents: `MI_A (✨): Haz una sugerencia cálida basada en '${interest}'. Si el usuario quiere aprender, preséntale la categoría CURSOS y su beneficio de acceso vitalicio con precios increíbles. Máximo 35 palabras.`,
                });
                return res.status(200).json({ text: response.text });
            }

            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: `MI_A (✨) explica con calidez y datos del catálogo: "${query}". Incluye información sobre la nueva rama CURSOS si es relevante. Máximo 50 palabras.`,
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
        return res.status(500).json({ error: 'MI_A está procesando demasiadas solicitudes. Por favor, intenta de nuevo.' });
    }
}
