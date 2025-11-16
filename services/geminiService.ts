// The Gemini SDK is no longer used on the client-side.
const API_ENDPOINT = '/api/gemini'; // The new serverless function endpoint

// A generic helper to call our backend endpoint
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
            const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response from server.' }));
            console.error(`API Error (${action}):`, errorData.error);
            return { error: errorData.error || `HTTP error! status: ${response.status}`};
        }
        return await response.json();
    } catch (error) {
        console.error(`Network or fetch error (${action}):`, error);
        return { error: 'A network error occurred.' };
    }
};

// --- Text Generation ---

export const getChatResponse = async (history: { role: string; parts: { text: string; }[]; }[], newMessage: string): Promise<string> => {
    const result = await callApi('chat', { history, newMessage });
    return result.error ? `Lo siento, ocurrió un error: ${result.error}` : result.text;
};

export const getQuickSuggestion = async (interest: string): Promise<string> => {
    const result = await callApi('suggest', { interest });
    return result.error ? `Lo siento, ocurrió un error: ${result.error}` : result.text;
};

// --- Search with Grounding ---
export const getGroundedSearch = async (query: string): Promise<{ text: string; sources: { uri: string; title: string }[] }> => {
    const result = await callApi('groundedSearch', { query });
    if (result.error) {
        return { text: `Lo siento, no pude realizar la búsqueda. El tema podría estar restringido o hubo un error de red. Error: ${result.error}`, sources: [] };
    }
    return { text: result.text, sources: result.sources || [] };
};

// --- Image Editing ---
export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string | null> => {
    const result = await callApi('editImage', { base64ImageData, mimeType, prompt });
    return result.error ? null : result.text;
};
