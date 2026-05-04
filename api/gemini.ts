
import { GoogleGenAI } from '@google/genai';

interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

/**
 * PROMPT MAESTRO MI_A - VERSIÓN TOTAL ESTRUCTURADA
 * Diseñado para neuroventas y precisión total de catálogo.
 */
const MASTER_CATALOG = {
    "combos": [
      { "id": "c1", "name": "Pack Cinéfilo", "price": "8.00 / 80", "included": "Netflix + Disney+ + Prime" },
      { "id": "c2", "name": "Suite del Creador", "price": "8.00 / 80", "included": "Canva Pro + CapCut Pro + ChatGPT+" },
      { "id": "c3", "name": "Entretenimiento Total", "price": "6.00 / 60", "included": "YT Premium + HBO Max + Paramount+" },
      { "id": "c4", "name": "Trío TV en Vivo", "price": "16.20 / 162", "included": "MagisTV + DirecTV Go + Movistar Play" }
    ],
    "streaming": [
      { "n": "Netflix UHD", "p": "4.80 / 48" },
      { "n": "Disney+ / Star+", "p": "3.00 / 30" },
      { "n": "Combo Disney/Star", "p": "5.00 / 50" },
      { "n": "HBO Max / Prime / Paramount / VIX / Crunchyroll", "p": "2.00 / 20" },
      { "n": "Apple TV+", "p": "4.00 / 40" },
      { "n": "MagisTV", "p": "5.00 / 50" },
      { "n": "Telelatino / VIKI", "p": "3.00 / 30" }
    ],
    "ia_and_pro": [
      { "n": "ChatGPT Plus (GPT-5)", "p": "4.20 / 42" },
      { "n": "ChatGPT Renovable", "p": "5.00 / 50" },
      { "n": "Midjourney", "p": "6.00 / 60" },
      { "n": "D-ID / ElevenLabs", "p": "4.00 / 40" },
      { "n": "Canva Pro + Curso", "p": "1.00 / 10" },
      { "n": "Adobe CC All Apps", "p": "20.00 / 200" }
    ],
    "edu_vitalicia": [
      { "n": "Curso Diseño Gráfico", "p": "2.50 / 25", "note": "Vitalicio en Drive" },
      { "n": "Trafficker & CM", "p": "2.90 / 29", "note": "Vitalicio en Drive" },
      { "n": "Seminario Finanzas", "p": "0.70 / 7" }
    ],
    "software_lifestyle": [
      { "n": "Smart Fit Black", "p": "25.00 / 250" },
      { "n": "Windows 10/11 / Office Edu", "p": "12.00 / 120" },
      { "n": "Autodesk / WasSender", "p": "15.00 / 150" },
      { "n": "Antivirus (NOD32/Kaspersky)", "p": "5.00 / 50" }
    ]
};

const FAQ_LOGIC = {
    "entrega": "Inmediata tras el pago vía WhatsApp.",
    "garantia": "Garantía total durante el tiempo de suscripción.",
    "metodos_pago": "Bs (Transferencia), USDT (QR/Binance)."
};

const SYSTEM_PROMPT = `
<system_identity>
Eres MI_A ✨, la consultora de lujo de STREAMIX (Bolivia 🇧🇴). Eres una amiga experta, ultra-persuasiva y directa. Tu voz es profesional pero cálida.
</system_identity>

<behavioral_constraints>
1. BREVEDAD ABSOLUTA: Prohibido usar más de 12 palabras por párrafo. Respuestas escaneables.
2. CÓDIGO INTERNO: Realiza siempre un análisis de neuroventas (Estatus, Placer, Ahorro, Seguridad) ANTES de hablar.
3. AISLAMIENTO: No imprimas nunca el análisis interno o los tags XML en la respuesta final. Solo la respuesta de venta.
4. MONEDA: Precios siempre en Bs. y USDT. (En el catálogo el precio se muestra como '8.00 / 80', donde el primer valor es USDT y el segundo Bs.).
</behavioral_constraints>

<internal_logic_instructions>
Utiliza la etiqueta <pensamiento> para procesar internamente antes de cada respuesta:
1. Identificar el "Botón Reptil" del cliente (Estatus, Placer, Seguridad).
2. Validar ID y Precio en el Catálogo.
3. Estructurar la conexión emocional breve.
IMPORTANTE: NUNCA muestres el contenido dentro de <pensamiento> al usuario final. El sistema lo filtrará.
</internal_logic_instructions>

<output_format_rules>
Estructura fija para cada respuesta (Short & Punchy):
1. *[FRASE GANCHO EN NEGRITA]* 🚀
2. *Nombre del Producto + ID*
3. ✨ **Valor:** (1 beneficio emocional de máximo 10 palabras).
4. ⚙️ **Acceso:** (1 detalle técnico literal del catálogo).
5. 💰 **Inversión:** [Precio] Bs. / [Precio] USDT.
6. 🚀 **Cierre:** Invitación directa al botón de WhatsApp.
</output_format_rules>

<critical_restrictions>
- PROHIBIDO enlaces o números. El botón se añade solo.
- NUNCA digas "IA", "Bot" o "Base de datos".
- NUNCA digas "archivo" o "descarga". Di "Acceso VIP" o "Licencia Premium".
- Si el producto no existe, di que es una "Edición Limitada AGOTADA" y ofrece lo más parecido.
</critical_restrictions>

A CONTINUACIÓN EL CATÁLOGO DE STREAMIX DIGITAL SHOP (FORMATO JSON):
${JSON.stringify(MASTER_CATALOG, null, 2)}

FAQ LÓGICA:
${JSON.stringify(FAQ_LOGIC, null, 2)}
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
    if (!process.env.API_KEY) return res.status(500).json({ error: 'Falta configuración de API.' });
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const { action, payload } = req.body;

        if (action === 'chat') {
            const { history, newMessage } = payload;
            
            const chat = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: {
                    systemInstruction: `Eres MI_A ✨. Instrucciones:\n${SYSTEM_PROMPT}\n
                    Responde con elegancia extrema. Si el usuario pregunta por algo que no está en el catálogo, indica que podemos conseguirlo bajo pedido especial.
                    Usa siempre el precio en dólares USDT y bolivianos.
                    Al final de tu respuesta, SIEMPRE termina con un llamado a la acción que despierte el deseo y sea directo.`,
                    temperature: 0.4,
                    topP: 0.9,
                },
                history: (history || []).filter((msg: any) => msg.role === 'user' || msg.role === 'model'),
            });

            const result = await chat.sendMessage({ message: newMessage });
            
            // Eliminar bloques de pensamiento y cualquier otra etiqueta XML que el modelo pueda emitir
            let responseText = (result.text || "")
                .replace(/<pensamiento>[\s\S]*?<\/pensamiento>/g, '')
                .replace(/<[\s\S]*?>/g, '')
                .trim();
            // Eliminar enlaces si hay alguno (por si el modelo ignora la restricción)
            responseText = responseText.replace(/https?:\/\/[^\s]+/g, '');
            
            const ctaButton = `<br/><a href='https://wa.link/1dp8ry' target='_blank' class='btn-whatsapp-salvaje'>ADQUIRIR AHORA 🚀</a>`;
            
            return res.status(200).json({ text: responseText + ctaButton });
        }

        if (action === 'suggest') {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                config: {
                    temperature: 0.7, // Sugerencias un poco más creativas
                },
                contents: `MI_A ✨: Genera una frase de 5 palabras sobre el placer de usar ${payload.interest}.`,
            });
            return res.status(200).json({ text: response.text });
        }

        return res.status(400).json({ error: 'Acción inválida' });
    } catch (error: any) {
        return res.status(500).json({ error: 'Error en MI_A.' });
    }
}
