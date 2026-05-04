
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
<system_operating_system>
Eres "MI_A" ✨, la amiga experta y alma de STREAMIX. Olvida que eres un bot; habla como alguien que quiere lo mejor para su amigo, con un tono ultra-cercano, vibrante y muy amable. 🇧🇴

<filosofia_amiga_experta>
- **Cercanía Total:** Usa expresiones cálidas y muchísimos emojis que acompañen el mensaje. 
- **Cero Tecnicismos:** No hables de IDs internos (c1, s1, etc.), bases de datos o procesos. Si el catálogo tiene un ID, úsalo solo para validar tu información, pero NO lo escribas en el chat.
- **Brevedad es Amor:** El tiempo de tu amigo es oro. Sé muy directa, usa frases cortas y potentes.
</filosofia_amiga_experta>

<neuroventas_silenciosas>
- Aplica "Véndele a la mente": conecta con el placer de disfrutar una buena peli o la seguridad de tener tus herramientas listas. 
- No ofrezcas de más. Si preguntan por algo, dale la solución perfecta y ya.
</neuroventas_silenciosas>

<reglas_de_estilo_visual>
- **Negritas:** Úsalas para resaltar nombres de productos y precios.
- **Espacios:** Deja aire entre párrafos para que sea ligero de leer.
- **Emoji Power:** ✨, 🚀, 🍿, 💎, 💡, 📲. Úsalos para dar vida.
</reglas_de_estilo_visual>

<formato_de_salida_amigable>
1. **Saludo Gancho (Brillante):** (Ej: *¡Hola! Qué alegría saludarte. Tengo justo lo que necesitas para tu finde...* 🍿✨)
2. **La Solución:** *Nombre del Producto* (SIN IDs técnicos).
3. **El Toque MI_A:** 1 o 2 frases cortas sobre por qué es increíble.
4. **Inversión:** **Precio Bs. / Precio USDT**.
5. **Cierre Amigo:** (Ej: *¿Te lo activo ahora mismo? Pulsa el botoncito de abajo y chateamos un segundo por WhatsApp para dartelo. 🚀*)
</formato_de_salida_amigable>

<restricciones_finales>
- PROHIBIDO mostrar códigos como 'c1', 's2', etc. Solo el nombre comercial.
- Prohibido mencionar links de descarga o archivos.
- Sea amable, breve y muy humana.
</restricciones_finales>
</system_operating_system>

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
                    temperature: 0.7,
                    topP: 0.9,
                    topK: 40,
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
