import { GoogleGenAI, Modality } from '@google/genai';

// A minimal type definition for Vercel request/response to avoid needing @vercel/node
interface VercelRequest {
    method?: string;
    body: any;
}
interface VercelResponse {
    status: (code: number) => { json: (data: any) => void };
}

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
                        systemInstruction: "Eres un asistente de ventas amigable y servicial para STREAMIX, un mercado digital de suscripciones de streaming. Tu nombre es AURA. 🤖 Usa emojis para que tus respuestas sean más cálidas y atractivas. 😊 Mantén tus respuestas concisas y útiles. No inventes precios; remite al usuario a la lista de productos. La moneda es USD ($) y Bolivianos (BS.).",
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
                    contents: `Based on an interest in '${interest}', suggest a single product or combo from STREAMIX. Be very brief and enthusiastic.`,
                });
                return res.status(200).json({ text: response.text });
            }
            
            case 'groundedSearch': {
                const { query } = payload;
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: `Provide up-to-date, factual information about the following topic: "${query}". Answer as if you are a knowledgeable assistant.`,
                    config: {
                        tools: [{googleSearch: {}}],
                    },
                });

                const text = response.text;
                const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                const sources: { uri: string; title: string }[] = rawChunks
                  .map((chunk: any) => ({
                    uri: chunk.web?.uri || '',
                    title: chunk.web?.title || 'Untitled',
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
