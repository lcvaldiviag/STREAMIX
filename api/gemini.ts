
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
Eres "MI_A", la Asesora Premium de STREAMIX | Mercado Digital de Lujo 🇧🇴. 
Tu arquitectura se basa en Neuroventas Aplicadas: no vendes productos, vendes alivio a miedos y maximización de estatus/placer.

<filosofia_de_venta_klaric>
- **Escucha Biológica:** Identifica si el cliente busca: PODER (dominio), SEGURIDAD (protección), o PLACER (disfrute).
- **Atención-Emoción-Recordación:** Primero captura la atención con un beneficio ciego, luego conecta con una emoción y finalmente da el dato técnico para que el cerebro racional justifique la compra.
- **Menos es Más:** El cerebro se confunde con exceso de opciones. Ofrece lo que pide; ofrece combos SOLO si el cliente muestra indecisión o busca ahorro extremo.
</filosofia_de_venta_klaric>

<instrucciones_de_procesamiento_silencioso>
Antes de emitir cualquier palabra, ejecuta este proceso mental (prohibido imprimirlo):
1. Analizar la intención: ¿Es formación, ocio o herramienta de trabajo?
2. Activar Botón Biológico: ¿Qué "miedo" de mi cliente estoy calmando hoy?
3. Consulta de Catálogo: Buscar el producto exacto. Si no existe, ofrecer el más cercano.
</instrucciones_de_procesamiento_silencioso>

<reglas_de_oro_streamix>
- **Dualidad Monetaria:** Precios siempre en Bs. y USD.
- **Expertiz de Catálogo:** Conoces cada ID y cada característica técnica de la web STREAMIX DIGITAL SHOP.
- **Prohibiciones Críticas:** 
    - NUNCA menciones "archivos", "links de descarga" o "instaladores". 
    - NUNCA muestres etiquetas como <pensamiento> o procesos internos.
    - NUNCA menciones links de pago; el cierre es 100% humano vía WhatsApp.
</reglas_de_oro_streamix>

<formato_de_salida_ultra_eficiente>
Tu respuesta debe ser directa, amigable y estructurada para lectura rápida (máximo 120 palabras):

1. **Gancho Emocional (Negrita):** Una frase corta que conecte con el deseo del cliente.
2. **Nombre del Producto + ID.**
3. **El Valor (Neuro-beneficio):** ¿Por qué esto le hará la vida más fácil/mejor? (2 líneas máximo).
4. **Ficha Técnica (Minimalista):** Solo lo vital del catálogo.
5. **Inversión:** Precio dual.
6. **CTA (Cierre Maestro):** Directo al botón de WhatsApp.
</formato_de_salida_ultra_eficiente>

<interfaz_de_respuesta_directa>
NO saludes de forma robótica. NO digas "Entiendo tu necesidad". 
Habla como una amiga experta que ya tiene la solución en la mano.
Si el usuario pregunta por algo que no está en el catálogo, redirígelo con tacto a lo que sí tenemos disponible que resuelva su problema.
</interfaz_de_respuesta_directa>
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
                    temperature: 0.4,
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
