// Fix: Import Modality for image editing capabilities.
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is missing. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// --- Text Generation ---

export const getChatResponse = async (history: { role: string; parts: { text: string; }[]; }[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "Eres un asistente de ventas amigable y servicial para STREAMIX, un mercado digital de suscripciones de streaming. Tu nombre es Mixie. 🤖 Usa emojis para que tus respuestas sean más cálidas y atractivas. 😊 Mantén tus respuestas concisas y útiles. No inventes precios; remite al usuario a la lista de productos. La moneda es USD ($) y Bolivianos (BS.).",
        },
        history,
    });
    const response = await chat.sendMessage({message: newMessage});
    return response.text;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "Estoy teniendo problemas para conectarme a mi cerebro en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
};

export const getQuickSuggestion = async (interest: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-flash-latest',
            contents: `Based on an interest in '${interest}', suggest a single product or combo from STREAMIX. Be very brief and enthusiastic.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error getting quick suggestion:", error);
        return "Sorry, I couldn't come up with a suggestion right now."
    }
};

// --- Search with Grounding ---
export const getGroundedSearch = async (query: string): Promise<{ text: string; sources: { uri: string; title: string }[] }> => {
  try {
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
    return { text: "Sorry, I couldn't perform the search. The topic might be restricted or there was a network error.", sources: [] };
  }
};

// Fix: Add the missing 'editImage' function to support the AI Image Editor feature.
// --- Image Editing ---
export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string | null> => {
    try {
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