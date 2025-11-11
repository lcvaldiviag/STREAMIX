// Nota importante: Este archivo debe estar en la ruta /api/gemini.ts
import { GoogleGenAI, Modality } from "@google/genai";

// Este es el manejador de la Función Serverless de Vercel
export default async function handler(req: Request) {
  // Solo permitir solicitudes POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'La clave de API no está configurada en el servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const body = await req.json();
    const { type } = body;

    // Usar un switch para manejar diferentes tipos de solicitudes
    switch (type) {
      case 'chat': {
        const { history, newMessage } = body;
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
              systemInstruction: "Eres un asistente de ventas amigable y servicial para STREAMIX, un mercado digital de suscripciones de streaming. Tu nombre es Mixie. 🤖 Usa emojis para que tus respuestas sean más cálidas y atractivas. 😊 Mantén tus respuestas concisas y útiles. No inventes precios; remite al usuario a la lista de productos. La moneda es USD ($) y Bolivianos (BS.).",
          },
          history,
        });
        const response = await chat.sendMessage({ message: newMessage });
        return new Response(JSON.stringify({ text: response.text }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'suggestion': {
        const { interest } = body;
        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: `Based on an interest in '${interest}', suggest a single product or combo from STREAMIX. Be very brief and enthusiastic.`,
        });
        return new Response(JSON.stringify({ text: response.text }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      case 'groundedSearch': {
        const { query } = body;
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
          .filter(source => source.uri);
        const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());
        
        return new Response(JSON.stringify({ text, sources: uniqueSources }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      case 'editImage': {
        const { base64ImageData, mimeType, prompt } = body;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { inlineData: { data: base64ImageData, mimeType } },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return new Response(JSON.stringify({ base64Image: part.inlineData.data }), {
                  headers: { 'Content-Type': 'application/json' },
                });
            }
        }
        return new Response(JSON.stringify({ error: 'No se pudo generar la imagen.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      default:
        return new Response(JSON.stringify({ error: `Tipo desconocido: ${type}` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Error en la llamada a la API de Gemini:', error);
    return new Response(JSON.stringify({ error: 'Ocurrió un error al comunicarse con el servicio de IA.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
