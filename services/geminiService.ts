// El SDK de Gemini ya no se utiliza en el lado del cliente.
// Ahora llamaremos a nuestro propio endpoint de backend seguro.

const API_ENDPOINT = '/api/gemini';

const handleApiError = (error: any, defaultMessage: string) => {
    console.error("Error de API:", error);
    // Intenta analizar un mensaje de error específico de nuestro backend
    if (error && typeof error.error === 'string') {
        return error.error;
    }
    return defaultMessage;
};

// --- Generación de Texto ---

export const getChatResponse = async (history: { role: string; parts: { text: string; }[]; }[], newMessage: string): Promise<string> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'chat', history, newMessage }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }
    const data = await response.json();
    return data.text;
  } catch (error) {
    return handleApiError(error, "Estoy teniendo problemas para conectarme a mi cerebro en este momento. Por favor, inténtalo de nuevo más tarde.");
  }
};

export const getQuickSuggestion = async (interest: string): Promise<string> => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'suggestion', interest }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        const data = await response.json();
        return data.text;
    } catch (error) {
        return handleApiError(error, "Lo siento, no pude encontrar una sugerencia en este momento.");
    }
};

// --- Búsqueda con Grounding ---
export const getGroundedSearch = async (query: string): Promise<{ text: string; sources: { uri: string; title: string }[] }> => {
  try {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'groundedSearch', query }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
    }
    return await response.json();
  } catch (error) {
    const errorMessage = handleApiError(error, "Lo siento, no pude realizar la búsqueda. El tema podría estar restringido o hubo un error de red.");
    return { text: errorMessage, sources: [] };
  }
};

// --- Edición de Imágenes ---
export const editImage = async (base64ImageData: string, mimeType: string, prompt: string): Promise<string | null> => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'editImage', base64ImageData, mimeType, prompt }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData;
        }
        const data = await response.json();
        return data.base64Image || null;
    } catch (error) {
        handleApiError(error, "Error al editar la imagen."); // El componente manejará el retorno nulo
        return null;
    }
};
