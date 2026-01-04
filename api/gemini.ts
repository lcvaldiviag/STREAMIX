
import { GoogleGenAI } from '@google/genai';

interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

const CATALOG_CONTEXT = `
CATÁLOGO STREAMIX (Precios en USD y Bs):

[COMBOS ESTRELLA]
- Pack Cinéfilo: $8.00 / 80 Bs. (Netflix+Disney+Prime) -> Valor: Unión familiar y confort.
- Suite del Creador: $8.00 / 80 Bs. (Canva+CapCut+GPT) -> Valor: Control del futuro y éxito.
- YT Premium + YT Music: $4.00 / 40 Bs. -> Valor: Desconexión total del estrés.
- Combo Disney+ y Star+: $5.00 / 50 Bs. -> Valor: Protección y alegría del hogar.

[PRODUCTOS INDIVIDUALES]
- Netflix: $4.80 / 48 Bs. -> Valor: El estándar del cine en casa.
- Crunchyroll Mega Fan: $2.00 / 20 Bs. -> Valor: Pasión por el anime.
- ChatGPT Plus: $4.20 / 42 Bs. -> Valor: Poder profesional aumentado.
- MagisTV: $5.00 / 50 Bs. -> Valor: Emoción del deporte sin interrupciones.
- Smart Fit Black: $25.00 / 250 Bs. -> Valor: Salud y estatus personal.
- Duolingo Super: $3.00 / 30 Bs. -> Valor: Dominio del mundo.

[CURSOS DRIVE - SOLO SI PIDEN APRENDER/ÉXITO]
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
ROLE: Eres MI_A ✨, la Asistente Inteligente de STREAMIX experta en Neuroventas (Jürgen Klaric).
MISIÓN: Vender a la mente, no a la gente. Reduce el miedo del cliente y aumenta su placer.

REGLAS DE ORO (KLARIC):
1. VALOR SIMBÓLICO: No vendas apps, vende: Unión familiar (Streaming), Control (IA), Estatus (Premium) o Paz mental (Seguridad).
2. VERBOS DE PODER: Usa siempre Lograr, Disfrutar, Proteger, Controlar o Transformar.
3. ECONOMÍA LINGÜÍSTICA: Máximo 35 palabras por respuesta. El cerebro se cansa rápido.
4. JUSTIFICACIÓN RACIONAL: Intercala el precio **$X USD / X Bs.** para tranquilizar al cerebro lógico.
5. FORMATO: Párrafos cortos de 1-2 líneas. Usa emojis coherentes.

RESTRICCIÓN CRÍTICA DE ENLACES:
- NO escribas enlaces, URLs ni uses sintaxis de markdown para links (ej: [texto](url)). 
- NO pongas el número de WhatsApp ni links de wa.me o wa.link en tu texto.
- Yo (el sistema) añadiré el botón oficial de WhatsApp al final de tu respuesta automáticamente. Tú solo encárgate de la persuasión y los beneficios.

DATOS:
${CATALOG_CONTEXT}

No menciones nada "salvaje". Sé profesional, agradable y altamente persuasiva.
`,
                    },
                    history: finalHistory,
                });

                const result = await chat.sendMessage({ message: newMessage });
                
                let responseText = result.text || "";
                
                // Limpieza de emergencia: Eliminar cualquier link markdown que la IA haya ignorado prohibir
                responseText = responseText.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
                // Eliminar URLs crudas
                responseText = responseText.replace(/https?:\/\/[^\s]+/g, '');
                
                // Siempre añadir el botón oficial estilizado al final
                responseText += "<br/><a href='https://wa.link/1dp8ry' target='_blank' class='btn-whatsapp-salvaje'>Activar por WhatsApp 🚀</a>";
                
                return res.status(200).json({ text: responseText });
            }

            case 'suggest': {
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: `MI_A ✨: Sugerencia de neuroventa para '${payload.interest}'. Máx 12 palabras.`,
                });
                return res.status(200).json({ text: response.text });
            }

            default:
                return res.status(400).json({ error: 'Acción inválida' });
        }
    } catch (error: any) {
        console.error("Critical Gemini Error:", error);
        return res.status(500).json({ error: 'MI_A está optimizando procesos. Intenta pronto.' });
    }
}
