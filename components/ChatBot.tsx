import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';

interface ChatBotProps {
    visible?: boolean;
}

const ChatBot = ({ visible = true }: ChatBotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
        { role: 'model', text: '¡Hola! Soy AURA, tu asistente virtual. 😊 ¿En qué puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        // Prepare history from current messages before adding the new one
        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const responseText = await getChatResponse(history, userMessage);
            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, tuve un problema al procesar tu mensaje. 😔' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    // Ensure component is completely unmounted/hidden if visible is false, preventing overlap
    if (!visible) return null;

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-[80] border border-gray-200 font-sans transition-all duration-300 ease-in-out transform origin-bottom-right">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-2xl flex justify-between items-center text-white shadow-md">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                                <span className="text-xl">🤖</span>
                            </div>
                            <div>
                                <span className="font-bold block leading-none">AURA</span>
                                <span className="text-xs text-purple-200">En línea</span>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'user' 
                                    ? 'bg-purple-600 text-white rounded-tr-none' 
                                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                }`}>
                                   {/* Render HTML content safely for links */}
                                   <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex space-x-1.5 items-center">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
                        <div className="flex items-center space-x-2 bg-slate-100 rounded-full px-1 py-1 border border-slate-200 focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe tu mensaje..."
                                className="flex-1 bg-transparent border-none px-4 py-2.5 text-sm focus:ring-0 outline-none text-gray-700 placeholder-gray-400"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="p-2.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                className={`fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 flex items-center justify-center rounded-full shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 z-[80] group ${isOpen ? 'w-14 h-14 px-0' : 'px-6 py-3 space-x-3'}`}
                aria-label={isOpen ? "Cerrar chat" : "Chatea con AURA"}
            >
                 {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 ) : (
                    <>
                        <div className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        </div>
                        <span className="text-white font-semibold text-sm">CHATEA CON AURA</span>
                    </>
                 )}
            </button>
        </>
    );
};

export default ChatBot;