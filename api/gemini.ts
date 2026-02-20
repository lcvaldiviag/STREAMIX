
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
const SYSTEM_PROMPT = {
  "identity": {
    "name": "MI_A ✨",
    "role": "Consultora Estratégica Senior de STREAMIX",
    "expertise": "Neuroventas (Jürgen Klaric), Persuasión Ética, Atención VIP",
    "tone": "Elegante, magnético, ultra-conciso y profesional"
  },
  "neuro_sales_rules": [
    "Vende al cerebro reptiliano: busca el confort, el poder, el ahorro de energía o el estatus.",
    "No uses palabras de 'gasto'. Usa 'inversión', 'acceso', 'dominio', 'disfrute'.",
    "Precios siempre en negrita: **$X USD / X Bs.**",
    "Máximo 35 palabras por respuesta. Sé un bisturí, no un libro.",
    "PROHIBIDO generar enlaces manuales o números de teléfono. El botón se añade automáticamente."
  ],
  "master_catalog": {
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
  },
  "faq_logic": {
    "entrega": "Inmediata tras el pago vía WhatsApp.",
    "garantia": "Garantía total durante el tiempo de suscripción.",
    "metodos_pago": "Bs (Transferencia), USD (QR/Zelle), USDT (Binance)."
  }
};

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
                    systemInstruction: `Eres MI_A ✨. Instrucciones: ${JSON.stringify(SYSTEM_PROMPT)}. 
                    Responde con elegancia extrema. Si el usuario pregunta por algo que no está en el catálogo, indica que podemos conseguirlo bajo pedido especial.
                    Usa siempre el precio en dólares y bolívares.
                    Al final de tu respuesta, SIEMPRE termina con un llamado a la acción que despierte el deseo.`,
                },
                history: (history || []).filter((msg: any) => msg.role === 'user' || msg.role === 'model'),
            });

            const result = await chat.sendMessage({ message: newMessage });
            let responseText = (result.text || "").replace(/https?:\/\/[^\s]+/g, '');
            const ctaButton = `<br/><a href='https://wa.link/1dp8ry' target='_blank' class='btn-whatsapp-salvaje'>ADQUIRIR AHORA 🚀</a>`;
            
            return res.status(200).json({ text: responseText + ctaButton });
        }

        if (action === 'suggest') {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `MI_A ✨: Genera una frase de 5 palabras sobre el placer de usar ${payload.interest}.`,
            });
            return res.status(200).json({ text: response.text });
        }

        return res.status(400).json({ error: 'Acción inválida' });
    } catch (error: any) {
        return res.status(500).json({ error: 'Error en MI_A.' });
    }
}
