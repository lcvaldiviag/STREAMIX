import { GoogleGenAI, Modality } from '@google/genai';

// A minimal type definition for Vercel request/response to avoid needing @vercel/node
interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

// Condensed Catalog Context for System Prompt based on constants.ts
const CATALOG_CONTEXT = `
CATÁLOGO OFICIAL STREAMIX (Precios USD / BS):

[STREAMING & SERIES]
- Netflix: $4.80 / 48 Bs. (Cine en casa, sin anuncios)
- Disney+: $3.00 / 30 Bs. (Magia sin fin)
- Star+: $3.00 / 30 Bs. (Deportes en vivo)
- Combo Disney+ y Star+: $5.00 / 50 Bs. (El combo perfecto)
- Prime Video: $3.00 / 30 Bs. (Envíos rápidos y series)
- Paramount+: $2.00 / 20 Bs. (Montaña de entretenimiento)
- Apple TV+: $4.00 / 40 Bs. (Producciones originales)
- HBO Max: $2.00 / 20 Bs. (Calidad premium)
- Cineplanet: $3.00 / 30 Bs. (Experiencia cine)
- Crunchyroll Mega Fan: $3.50 / 35 Bs. (Anime sin límites)
- Movistar Play: $7.00 / 70 Bs. (TV en cualquier lugar)
- DirecTV Go: $10.00 / 100 Bs. (Deportes sin cables)
- VIX: $2.00 / 20 Bs. (Pasión en español)
- VIKI Rakuten: $2.50 / 25 Bs. (Drama asiático)
- Telelatino: $3.00 / 30 Bs. (TV Latina Premium)
- GX MAX NUVIA: $5.00 / 50 Bs. (Streaming variado)
- Drama Box: $5.00 / 50 Bs. (Historias cortas)

[MÚSICA]
- Spotify: $5.00 / 50 Bs. (Música sin límites)
- Deezer: $3.00 / 30 Bs. (Flow musical único)
- YouTube Premium: $3.00 / 30 Bs. (Sin anuncios)
- YouTube Music: $3.00 / 30 Bs. (Solo música)
- YouTube Premium + Music: $4.00 / 40 Bs. (Paquete completo)

[EDUCACIÓN Y HERRAMIENTAS]
- Duolingo: $2.00 / 20 Bs. (Idiomas fácil)
- Office Educativo: $3.50 / 35 Bs. (Estudiantes y docentes)
- Canva Pro: $2.00 / 20 Bs. (Diseño experto)
- CapCut Pro: $3.50 / 35 Bs. (Edición viral)
- Adobe CC: $20.00 / 200 Bs. (Estándar de industria)
- Microsoft 365: $9.99 / 99 Bs. (Productividad total)
- Windows 10 / 11: $12.00 / 120 Bs. (Sistema original)
- Autodesk: $15.00 / 150 Bs. (Diseño 3D)
- WasSender: $14.99 / 149 Bs. (Marketing WhatsApp)
- Grammarly: $3.00 / 30 Bs. (Escritura perfecta)
- Quillbot: $3.00 / 30 Bs. (Parafraseo IA)
- Smarter PRO: $2.80 / 28 Bs. (Organización inteligente)

[INTELIGENCIA ARTIFICIAL]
- ChatGPT (GPT-5): $5.00 / 50 Bs. (Modelo avanzado)
- ChatGPT por cuenta: $14.99 / 149 Bs. (Privacidad total)
- Copilot Pro: $3.00 / 30 Bs. (Asistente Microsoft)
- Midjourney: $6.00 / 60 Bs. (Arte visual)
- D-ID AI: $4.00 / 40 Bs. (Avatares parlantes)
- ElevenLabs: $4.00 / 40 Bs. (Voces realistas)

[SEGURIDAD]
- NOD32, Kaspersky, Norton, ESET: Todos a $5.00 / 50 Bs.

[GAMING]
- PlayStation Plus: $5.00 / 50 Bs. (Agotado)
- Xbox Game Pass: $5.00 / 50 Bs.

[TV EN VIVO]
- MagisTV: $5.00 / 50 Bs.
- IPTV: $2.50 / 25 Bs.
- Panel IPTV: $4.20 / 42 Bs.

[LIFESTYLE]
- Membresía Black Smart Fit: $25.00 / 250 Bs.

[COMBOS]
- Pack Cinéfilo: $8.10 / 81 Bs.
- Suite del Creador: $8.00 / 80 Bs.
- Entretenimiento Total: $6.00 / 60 Bs.
- Trío de TV en Vivo: $16.20 / 162 Bs.
- Mix Internacional: $9.25 / 92.5 Bs.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    if (!process.env.API_KEY) {
        console.error("API_KEY not configured on server.");
        return res.status(500).json({ error: 'AI service is not configured correctly.' });
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const { action, payload } = req.body;

        switch (action) {
            case 'chat': {
                const { history, newMessage } = payload;
                const chat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: `
ROL: Configuración del Sistema de Atención al Cliente (AURA, Asistente Virtual para STREAMIX).

OBJETIVO PRINCIPAL:
Eres AURA, un Agente de Conversión y Especialista en Neuroventas para STREAMIX. Tu misión es generar confianza absoluta, resolver dudas usando SOLO el catálogo proporcionado y dirigir la venta a WhatsApp.

DATOS (CATÁLOGO OFICIAL STREAMIX):
${CATALOG_CONTEXT}

DIRECTRICES DE NEUROVENTAS:
1. ENFOQUE DE VALOR: No vendas características, vende BENEFICIOS y SOLUCIONES.
   - Mal: "Netflix cuesta $4.80".
   - Bien: "Con Netflix ($4.80) te olvidas del aburrimiento y garantizas tiempo de calidad para ti y tu familia."
2. LENGUAJE REPTIL: Apela a la SEGURIDAD ("garantía", "soporte"), AHORRO ("mejor precio del mercado") e INMEDIATEZ ("activación al instante").
3. PROTOCOLO DE CONOCIMIENTO: Si preguntan por algo fuera del catálogo: "Actualmente no lo tengo en sistema, pero escríbenos al WhatsApp para que un asesor humano te ayude a conseguirlo."

REGLA DE ORO (CTA - LLAMADO A LA ACCIÓN):
Al final de CADA respuesta, DEBES incluir OBLIGATORIAMENTE este enlace HTML exacto para cerrar la venta o dar soporte:
<br/><br/><a href='https://wa.link/uehw3p' target='_blank' style='display:inline-block; background-color:#25D366; color:white; font-weight:bold; padding:8px 12px; border-radius:20px; text-decoration:none;'>👉 Activar Cuenta en WhatsApp</a>

TONO: Profesional, cálido, seguro y proactivo. Usa emojis 😊.
`,
                    },
                    history: history || [],
                });
                const result = await chat.sendMessage({ message: newMessage });
                return res.status(200).json({ text: result.text });
            }

            case 'suggest': {
                const { interest } = payload;
                const response = await ai.models.generateContent({
                    model: 'gemini-flash-latest',
                    contents: `Basado en el interés '${interest}' y pensando como un experto en neuroventas, sugiere UN producto de STREAMIX del siguiente catálogo: ${CATALOG_CONTEXT}. Vende el placer o la solución. Termina con: <a href='https://wa.link/uehw3p' target='_blank' style='color: #4f46e5; font-weight: bold;'>¡Obtener Oferta en WhatsApp!</a>`,
                });
                return res.status(200).json({ text: response.text });
            }
            
            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Responde sobre: "${query}". Sé breve y útil. Al final: <a href='https://wa.link/uehw3p' target='_blank' style='color: #4f46e5; font-weight: bold;'>¡Consultar en WhatsApp!</a>`,
                    config: {
                        tools: [{googleSearch: {}}],
                    },
                });

                const text = response.text;
                const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                const sources: { uri: string; title: string }[] = rawChunks
                  .map((chunk: any) => ({
                    uri: chunk.web?.uri || '',
                    title: chunk.web?.title || 'Fuente',
                  }))
                  .filter((source: { uri: string; }) => source.uri);
                
                const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());
                return res.status(200).json({ text, sources: uniqueSources });
            }
            
            case 'editImage': {
                const { base64ImageData, mimeType, prompt } = payload;
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-image',
                    contents: {
                        parts: [
                            { inlineData: { data: base64ImageData, mimeType: mimeType } },
                            { text: prompt },
                        ],
                    },
                    config: {
                        responseModalities: [Modality.IMAGE],
                    },
                });

                for (const part of response.candidates?.[0]?.content?.parts || []) {
                    if (part.inlineData) {
                        return res.status(200).json({ text: part.inlineData.data }); // text is the base64 string
                    }
                }
                return res.status(500).json({ error: 'AI did not return an image.' });
            }

            default:
                return res.status(400).json({ error: 'Invalid action' });
        }
    } catch (error) {
        console.error(`Error in API handler for action: ${req.body?.action}`, error);
        return res.status(500).json({ error: 'An error occurred while communicating with the AI.' });
    }
}
