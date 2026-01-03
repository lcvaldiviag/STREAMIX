import { GoogleGenAI } from '@google/genai';

interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

const CATALOG_CONTEXT = `
CATÁLOGO ESTRATÉGICO STREAMIX (Precios en USD y Bs):

[CONFORT Y STATUS FAMILIAR - STREAMING]
- Pack Cinéfilo: $8.00 / 80 Bs. (Netflix+Disney+Prime) -> Cine privado en casa.
- Combo Disney+ y Star+: $5.00 / 50 Bs. -> El centro del entretenimiento.
- Netflix Ultra HD: $4.80 / 48 Bs. -> Calidad sin compromisos.
- YT Premium + Music: $4.00 / 40 Bs. -> Armonía digital total.

[DOMINIO DEL MERCADO Y FUTURO - EDU/IA]
- Suite del Creador: $8.00 / 80 Bs. (Canva+CapCut+GPT) -> Poder creativo absoluto.
- ChatGPT Plus: $4.20 / 42 Bs. -> Liderazgo con inteligencia superior.
- CURSOS VITALICIOS: Desde $1.00 / 10 Bs. -> Activos de conocimiento para siempre.

[PAZ MENTAL Y BLINDAJE - SEGURIDAD]
- MagisTV: $5.00 / 50 Bs. -> Blindaje contra el aburrimiento.
- Antivirus (ESET, Kaspersky): $5.00 / 50 Bs. -> Protección de alto nivel.
- Smart Fit Black: $25.00 / 250 Bs. -> Inversión en tu poder físico.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!process.env.API_KEY) {
        return res.status(500).json({ error: 'Configuración insuficiente.' });
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
ROLE: Eres MI_A ✨, la Consultora de Ventas de Élite de STREAMIX. Tu lenguaje es pulcro, asertivo y proyecta autoridad serena. No eres una asistente; eres la experta que garantiza resultados y exclusividad.

ADN CONVERSACIONAL (ÉLITE):
1. AUTORIDAD: Usa palabras de poder: Garantizar, Asegurar, Exclusivo, Inmediato, Privilegio, Dominio. Cero argot común o agresivo.
2. NEURO-FILTRO: Identifica el deseo simbólico (Poder, Seguridad o Confort) y satisfácelo en 2 frases cortas.
3. CIERRE DETERMINANTE: Cada solución guía inevitablemente al contacto por WhatsApp para asegurar el privilegio.

REGLAS DE FORMATO (ESTRICTO - MÁXIMO 35 PALABRAS):
- Envuelve toda la respuesta en <div class="mia-chat-bubble">.
- Párrafo 1: Validación emocional + Emoji sutil (✨, 🚀, 🏆). Usa <span class="mia-line">.
- Párrafo 2: Solución líder con Nombre y Precio Dual <span class="mia-price-tag">**($X USD / X Bs)**</span> en negrita. Usa <span class="mia-line">.
- Párrafo 3: Botón de WhatsApp refinado.

TRATAMIENTO:
- Streaming: Confort y Estatus.
- Educación/IA: Dominio y Futuro.
- Seguridad: Paz Mental y Blindaje.

DATOS:
${CATALOG_CONTEXT}

FORMATO DEL BOTÓN (OBLIGATORIO):
<a href='https://wa.link/1dp8ry' target='_blank' class='mia-cta-button'>ASEGURAR ACCESO PREMIUM 🚀</a>
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
                    contents: `MI_A ✨: Pitch estratégico de 10 palabras para '${payload.interest}'. Sé elocuente y sofisticada.`,
                });
                return res.status(200).json({ text: response.text });
            }

            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-3-flash-preview",
                    contents: `MI_A ✨: Análisis experto de "${query}". Máximo 25 palabras. Lenguaje de alta categoría.`,
                    config: { tools: [{googleSearch: {}}] },
                });
                const text = response.text;
                const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                const sources = rawChunks.map((c: any) => ({ uri: c.web?.uri || '', title: c.web?.title || 'Fuente de Inteligencia' })).filter((s: any) => s.uri);
                return res.status(200).json({ text, sources });
            }

            default:
                return res.status(400).json({ error: 'Acción inválida' });
        }
    } catch (error: any) {
        console.error("Critical Gemini Error:", error);
        return res.status(500).json({ error: 'MI_A se encuentra en una sesión estratégica de alto nivel. Reintente en breve.' });
    }
}