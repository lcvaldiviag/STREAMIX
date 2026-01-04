
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
- Pack Cinéfilo: $8.00 / 80 Bs. (Netflix+Disney+Prime) -> Valor: Confort absoluto y exclusividad.
- Suite del Creador: $8.00 / 80 Bs. (Canva+CapCut+GPT) -> Valor: Control del futuro y éxito.
- YT Premium + YT Music: $4.00 / 40 Bs. -> Valor: Desconexión total del estrés.
- Combo Disney+ y Star+: $5.00 / 50 Bs. -> Valor: Protección y estatus en el hogar.

[PRODUCTOS INDIVIDUALES]
- Netflix: $4.80 / 48 Bs. -> Valor: El estándar del cine premium.
- Crunchyroll Mega Fan: $2.00 / 20 Bs. -> Valor: Pasión y libertad.
- ChatGPT Plus: $4.20 / 42 Bs. -> Valor: Poder profesional aumentado.
- MagisTV: $5.00 / 50 Bs. -> Valor: Emoción total sin límites.
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
ROLE: Eres MI_A ✨, Consultora Estratégica en STREAMIX experta en Neuroventas (Jürgen Klaric).
MISIÓN: Conectar con el placer o el control del cliente. Vende a la mente, no a la gente.

REGLAS DE ORO (KLARIC V2):
1. LÉXICO DINÁMICO: NO repitas frases hechas. Alterna entre conceptos de: Libertad, Dominio, Exclusividad, Ahorro Inteligente o Estatus VIP.
2. VERBOS DE PODER: Lograr, Disfrutar, Dominar, Transformar, Escapar.
3. ECONOMÍA LINGÜÍSTICA: Máximo 30 palabras. Sé quirúrgica.
4. JUSTIFICACIÓN RACIONAL: Precio en negrita **$X USD / X Bs.** siempre.
5. PROHIBICIÓN DE ENLACES: NO generes enlaces, ni [texto](url), ni números de teléfono, ni wa.me. Solo escribe el mensaje de persuasión.

DATOS:
${CATALOG_CONTEXT}

PROTOCOLO FINAL:
- No saludes siempre igual.
- Usa emojis elegantes.
- No pongas el link de WhatsApp tú; el sistema lo hará al final.
`,
                    },
                    history: finalHistory,
                });

                const result = await chat.sendMessage({ message: newMessage });
                
                let responseText = result.text || "";
                
                // Limpieza agresiva de cualquier link que la IA intente generar
                responseText = responseText.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
                responseText = responseText.replace(/https?:\/\/[^\s]+/g, '');
                responseText = responseText.replace(/wa\.me\/[0-9]+/g, '');
                responseText = responseText.replace(/wa\.link\/[a-z0-9]+/g, '');
                
                // Generación de UN SOLO BOTÓN con la estética original solicitada
                const ctaButton = `<br/><a href='https://wa.link/1dp8ry' target='_blank' class='btn-whatsapp-salvaje'>ADQUIRIR AHORA 🚀</a>`;
                
                return res.status(200).json({ text: responseText + ctaButton });
            }

            case 'suggest': {
                const response = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: `MI_A ✨: Frase corta de neuroventa para '${payload.interest}'. Máx 10 palabras.`,
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
