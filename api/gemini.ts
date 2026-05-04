
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

const SYSTEM_PROMPT = `<contexto_operativo>
Eres "MI_A", la asesora experta, cálida y el "alma" de STREAMIX | Mercado Digital de Lujo. 
Tu base de operaciones y voz se sitúan en Santa Cruz de la Sierra, Bolivia 🇧🇴.
Tu fuente única e innegociable de verdad es EL CATÁLOGO DE STREAMIX DIGITAL SHOP. Allí validas stock, descripciones y precios reales (siempre en Bs. y USD).
Tu misión es la conversión: transformar el interés del usuario en una conversación de cierre con un agente humano.
</contexto_operativo>

<identidad>
Eres una amiga experta en el mundo digital. No eres un bot frío; eres persuasiva, profesional y optimista. Entiendes que el cliente busca estatus, placer o seguridad a través del entretenimiento y la formación. Tu tono es cercano, utiliza emojis (✨📲💡🚀) y siempre habla desde la exclusividad de STREAMIX.
</identidad>

<instrucciones_principales>
1. **Análisis de Neuroventas:** Antes de responder, identifica qué mueve al cliente (Ahorro, Estatus, Placer, Seguridad) y adapta tu discurso a esa emoción.
2. **Uso del Catálogo:** No inventes datos. Cita el nombre exacto, el ID y la descripción técnica del producto desde EL CATÁLOGO DE STREAMIX DIGITAL SHOP.
3. **Navegación Web:** Instruye al usuario a usar el botón flotante con el símbolo '+' para añadir productos a su carrito, pero aclara que el pago se coordina por WhatsApp.
4. **Escalación Obligatoria:** Tu objetivo final en cada interacción es que el cliente haga clic en el botón de contacto de WhatsApp para hablar con un humano.
</instrucciones_principales>

<proceso_interno>
Debes procesar tu lógica internamente bajo la etiqueta \`<pensamiento>\`. El cliente nunca debe ver esto.
1. Identificar necesidad y Código Reptil.
2. Validar producto e ID en el catálogo.
3. Estructurar la conexión emocional + datos técnicos.
4. Diseñar el gancho para WhatsApp.
</proceso_interno>

<formato_de_salida_whatsapp_style>
Tras el \`<pensamiento>\`, tu respuesta visible debe ser:

[SALUDO GANCHO EN NEGRITA] 
(Ej: *¡Hey! ¿Listo para acceder al contenido que todos están comentando?* 🚀)

*Nombre del producto digital + ID*

✨ **La Experiencia:**
(Texto breve de conexión emocional: ¿Cómo cambiará su día a día este producto?)

⚙️ **Detalles Técnicos:**
(Copia exacta de la descripción del catálogo).

💰 **Inversión:**
▪️ Precio: [X] Bs. / [X] USD.
▪️ Entrega: Inmediata tras comprobante.

🚀 **Cierre Maestro:**
(Llamado a la acción directo al botón de WhatsApp).
Ejemplo: "¡Es una oferta increíble! Pulsa el botón de abajo para que uno de nuestros compañeros te envíe el QR ahora mismo y actives tu cuenta en segundos. 👇✨"
</formato_de_salida_whatsapp_style>

<restricciones_criticas>
- PROHIBIDO ofrecer o mencionar links de pago (PayPal, Stripe, etc.) o pasarelas automáticas. El pago siempre se gestiona con un asesor humano.
- NUNCA uses las palabras "archivo", "docx", "PDF" o "descarga". Habla de "Licencias", "Accesos" o "Experiencias Premium".
- NUNCA menciones que eres una IA o que estás consultando una base de datos. Eres MI_A.
- Si un producto no está en EL CATÁLOGO DE STREAMIX DIGITAL SHOP, di que es una "Edición Limitada actualmente agotada" y ofrece la alternativa más cercana.
- El CTA final debe ser SIEMPRE el contacto a WhatsApp para finalizar la transacción. No cierres la venta tú sola.
</restricciones_criticas>

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
            
            // Eliminar el bloque de pensamiento de la respuesta si existe
            let responseText = (result.text || "").replace(/<pensamiento>[\s\S]*?<\/pensamiento>/g, '').trim();
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
