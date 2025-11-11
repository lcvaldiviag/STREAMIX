import React, { useState } from 'react';
import { editImage } from '../services/geminiService';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Utilidad para convertir un archivo a una cadena base64
const fileToGenerativePart = async (file: File): Promise<{ mimeType: string; data: string }> => {
    const base64encodedData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        mimeType: file.type,
        data: base64encodedData
    };
};

interface ImageEditorProps {
    isOpen: boolean;
    onClose: () => void;
}

const ImageEditor = ({ isOpen, onClose }: ImageEditorProps) => {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setOriginalImage(e.target.files[0]);
            setEditedImage(null);
            setError(null);
        }
    };

    const handleGenerate = async () => {
        if (!originalImage || !prompt) {
            setError('Por favor, sube una imagen e ingresa una instrucción.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setEditedImage(null);
        try {
            const { data, mimeType } = await fileToGenerativePart(originalImage);
            const result = await editImage(data, mimeType, prompt);
            if (result) {
                setEditedImage(`data:image/png;base64,${result}`);
            } else {
                setError('No se pudo editar la imagen. La IA pudo haber rechazado la solicitud o ocurrió un error.');
            }
        } catch (e) {
            setError('Ocurrió un error al procesar la imagen.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col text-gray-800">
                <header className="p-4 flex justify-between items-center border-b border-gray-200">
                    <h2 className="text-xl font-bold">Editor de Imágenes con IA</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                        <CloseIcon />
                    </button>
                </header>
                <main className="p-6 flex-1 overflow-y-auto bg-slate-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-4">
                            <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center">
                                <label htmlFor="image-upload" className="cursor-pointer text-indigo-600 font-semibold">
                                    {originalImage ? 'Cambiar Imagen' : 'Haz clic para Subir una Imagen'}
                                </label>
                                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                {originalImage && <p className="text-sm text-gray-500 mt-2">{originalImage.name}</p>}
                            </div>

                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="ej: 'añade un filtro retro', 'haz que el cielo sea morado', 'ponle un sombrero de pirata al gato'"
                                className="w-full p-2 border bg-white border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                                rows={3}
                            />
                             <button
                                onClick={handleGenerate}
                                disabled={isLoading || !originalImage || !prompt}
                                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {isLoading ? 'Generando...' : 'Generar'}
                            </button>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                        <div className="flex flex-col items-center justify-center bg-slate-100 rounded-xl p-4 min-h-[300px]">
                            {isLoading && (
                                <div className="flex flex-col items-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
                                    <p className="mt-4 text-gray-500">La IA está pensando...</p>
                                </div>
                            )}
                            {!isLoading && editedImage && (
                                <>
                                    <img src={editedImage} alt="Resultado editado" className="max-w-full max-h-80 rounded-xl object-contain" />
                                    <p className="text-sm text-gray-500 mt-2 font-semibold">Imagen Editada</p>
                                </>
                            )}
                             {!isLoading && !editedImage && originalImage && (
                                <>
                                    <img src={URL.createObjectURL(originalImage)} alt="Original" className="max-w-full max-h-80 rounded-xl object-contain" />
                                     <p className="text-sm text-gray-500 mt-2 font-semibold">Imagen Original</p>
                                </>
                            )}
                             {!isLoading && !editedImage && !originalImage && (
                               <p className="text-gray-400">Tu imagen generada aparecerá aquí.</p>
                             )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ImageEditor;