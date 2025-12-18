
// El SDK de Gemini ya no se usa directamente en el cliente por seguridad.
const API_ENDPOINT = '/api/gemini'; 

const callApi = async (action: string, payload: object): Promise<any> => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action, payload }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Error inesperado.' }));
            return { error: errorData.error || `Error ${response.status}`};
        }
        return await response.json();
    } catch (error) {
        console.error(`Network error (${action}):`, error);
        return { error: 'Error de red al conectar con AURA.' };
    }
};

export const getChatResponse = async (history: { role: string; parts: { text: string; }[]; }[], newMessage: string): Promise<string> => {
    const result = await callApi('chat', { history, newMessage });
    if (result.error) {
        return `¡Hola! Mil disculpas, parece que tuve un pequeño tropiezo técnico. 🤶🏻 Pero no te preocupes, puedes consultarme lo que gustes de nuevo o podemos seguir la charla directamente por WhatsApp para darte una atención VIP. 🎁`;
    }
    return result.text;
};

export const getQuickSuggestion = async (interest: string): Promise<string> => {
    const result = await callApi('suggest', { interest });
    return result.error ? `¿Te gustaría conocer nuestras mejores ofertas en ${interest}?` : result.text;
};

export const getGroundedSearch = async (query: string): Promise<{ text: string; sources: { uri: string; title: string }[] }> => {
    const result = await callApi('groundedSearch', { query });
    if (result.error) {
        return { text: `No pude realizar la búsqueda en este momento, pero puedo darte info de nuestro catálogo.`, sources: [] };
    }
    return { text: result.text, sources: result.sources || [] };
};

export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string | null> => {
    const result = await callApi('editImage', { base64ImageData, mimeType, prompt });
    return result.error ? null : result.text;
};
