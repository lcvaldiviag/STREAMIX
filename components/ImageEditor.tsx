import React, { useState } from 'react';
import { editImage } from '../services/geminiService';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Utility to convert a file to a base64 string
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
            setError('Please upload an image and enter a prompt.');
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
                setError('Failed to edit image. The AI may have refused the request.');
            }
        } catch (e) {
            setError('An error occurred while processing the image.');
            console.error(e);
        }
        setIsLoading(false);
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E1E3F] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <header className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white">AI Image Editor</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-300 hover:bg-white/10">
                        <CloseIcon />
                    </button>
                </header>
                <main className="p-6 flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-4">
                            <div className="p-4 border-2 border-dashed border-gray-600 rounded-xl text-center">
                                <label htmlFor="image-upload" className="cursor-pointer text-blue-400 font-semibold hover:text-blue-300">
                                    {originalImage ? 'Change Image' : 'Click to Upload Image'}
                                </label>
                                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                {originalImage && <p className="text-sm text-gray-400 mt-2">{originalImage.name}</p>}
                            </div>

                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., 'add a retro filter', 'make the sky purple', 'put a pirate hat on the cat'"
                                className="w-full p-2 bg-gray-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                            />
                             <button
                                onClick={handleGenerate}
                                disabled={isLoading || !originalImage || !prompt}
                                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {isLoading ? 'Generating...' : 'Generate'}
                            </button>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                        <div className="flex flex-col items-center justify-center bg-black/30 rounded-xl p-4 min-h-[300px]">
                            {isLoading && (
                                <div className="flex flex-col items-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>
                                    <p className="mt-4 text-gray-400">AI is thinking...</p>
                                </div>
                            )}
                            {!isLoading && editedImage && (
                                <>
                                    <img src={editedImage} alt="Edited result" className="max-w-full max-h-80 rounded-xl object-contain" />
                                    <p className="text-sm text-gray-400 mt-2 font-semibold">Edited Image</p>
                                </>
                            )}
                             {!isLoading && !editedImage && originalImage && (
                                <>
                                    <img src={URL.createObjectURL(originalImage)} alt="Original" className="max-w-full max-h-80 rounded-xl object-contain" />
                                     <p className="text-sm text-gray-400 mt-2 font-semibold">Original Image</p>
                                </>
                            )}
                             {!isLoading && !editedImage && !originalImage && (
                               <p className="text-gray-500">Your generated image will appear here.</p>
                             )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ImageEditor;