// Fix: Import Modality for image editing capabilities.
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

// The GoogleGenAI instance will now be created on-demand inside each function.
// This prevents the app from crashing on load if the API key is not immediately available.

const API_KEY_ERROR_MESSAGE = "No se pudo conectar con el asistente de IA. (Error de configuración: Falta la clave de API). Por favor, contacta al administrador del sitio.";

// --- Text Generation ---

export const getChatResponse = async (history: { role: string; parts: { text: string; }[]; }[], newMessage: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return API_KEY_ERROR_MESSAGE;
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "Eres un asistente de ventas amigable y servicial para STREAMIX, un mercado digital de suscripciones de streaming. Tu nombre es Mixie. 🤖 Usa emojis para que tus respuestas sean más cálidas y atractivas. 😊 Mantén tus respuestas concisas y útiles. No inventes precios; remite al usuario a la lista de productos. La moneda es USD ($) y Bolivianos (BS.).",
        },
        history,
    });
    // Fix: The sendMessage method expects an object with a 'message' property.
    const response = await chat.sendMessage({ message: newMessage });
    return response.text;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "Estoy teniendo problemas para conectarme a mi cerebro en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
};

export const getQuickSuggestion = async (interest: string): Promise<string> => {
    if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set.");
        return API_KEY_ERROR_MESSAGE;
    }
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: `Based on an interest in '${interest}', suggest a single product or combo from STREAMIX. Be very brief and enthusiastic.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting quick suggestion:", error);
        return "Lo siento, no pude encontrar una sugerencia en este momento."
    }
};

// --- Search with Grounding ---
export const getGroundedSearch = async (query: string): Promise<{ text: string; sources: { uri: string; title: string }[] }> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return { text: API_KEY_ERROR_MESSAGE, sources: [] };
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide up-to-date, factual information about the following topic: "${query}". Answer as if you are a knowledgeable assistant.`,
        config: {
            tools: [{googleSearch: {}}],
        },
    });

    const text = response.text;
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    // Fix: Explicitly type `sources` to ensure correct type inference for `uniqueSources`.
    const sources: { uri: string; title: string }[] = rawChunks
      // Fix: Explicitly type 'chunk' as 'any' to avoid type mismatch errors.
      .map((chunk: any) => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Untitled',
      }))
      .filter(source => source.uri);
    
    // Deduplicate sources
    const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());

    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Error with grounded search:", error);
    return { text: "Lo siento, no pude realizar la búsqueda. El tema podría estar restringido o hubo un error de red.", sources: [] };
  }
};

// Fix: Add the missing 'editImage' function to support the AI Image Editor feature.
// --- Image Editing ---
export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string | null> => {
    if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set.");
        return null;
    }
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        return null;
    } catch (error) {
        console.error("Error editing image:", error);
        return null;
    }
};