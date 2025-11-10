import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatResponse, getGroundedSearch, getQuickSuggestion } from '../services/geminiService';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (isOpen) {
            setMessages([{ sender: 'bot', text: '¡Hola! 👋 Soy Mixie, tu asistente de IA. Pregúntame sobre nuestros productos o escribe /suggest para una recomendación. ¡Estoy aquí para ayudarte! 😊' }]);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        let response: ChatMessage;
        
        if (input.toLowerCase().startsWith('/suggest')) {
            const query = input.substring(8) || 'something fun';
             const suggestion = await getQuickSuggestion(query);
             response = { sender: 'bot', text: suggestion };
        } else {
            const chatHistory = messages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));
            const botText = await getChatResponse(chatHistory, input);
            response = { sender: 'bot', text: botText };
        }
        
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-10 right-10 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center space-x-3 px-5 py-3 rounded-full shadow-lg shadow-black/40 hover:scale-105 transition-transform duration-300 z-40"
                aria-label="Open Chat"
            >
                <ChatIcon />
                <span className="text-white font-semibold pr-2 text-sm">¡Hola! soy Mixie, te ayudo?</span>
            </button>

            {isOpen && (
                <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-80 sm:h-[500px] bg-[#1E1E3F] rounded-t-lg sm:rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 border border-gray-700/50">
                    <header className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 flex justify-between items-center rounded-t-lg sm:rounded-t-2xl">
                        <h3 className="text-lg font-semibold text-white">Chatea con Mixie</h3>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-white hover:bg-white/20 transition-colors">
                            <CloseIcon />
                        </button>
                    </header>

                    <main className="flex-1 p-4 overflow-y-auto bg-[#121212]">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-[#3A86FF] text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none'}`}>
                                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                                        {msg.sources && msg.sources.length > 0 && (
                                            <div className="mt-2 pt-2 border-t border-gray-500">
                                                <h4 className="text-xs font-semibold mb-1">Fuentes:</h4>
                                                <ul className="text-xs space-y-1">
                                                {msg.sources.map((source, i) => (
                                                    <li key={i}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate block">{source.title}</a></li>
                                                ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="px-4 py-2 rounded-2xl bg-gray-700 text-gray-100 rounded-bl-none">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </main>

                    <footer className="p-3 bg-[#1E1E3F] border-t border-gray-700/50">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#3A86FF]"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading} className="ml-3 p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white hover:opacity-90 disabled:bg-gray-500">
                               <SendIcon />
                            </button>
                        </div>
                    </footer>
                </div>
            )}
        </>
    );
};

export default ChatBot;