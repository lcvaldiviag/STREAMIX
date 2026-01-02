
import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../services/geminiService';

interface ChatBotProps {
    visible?: boolean;
}

const ChatBot = ({ visible = true }: ChatBotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
        { 
            role: 'model', 
            text: '¡Hola! Soy <b>MI_A</b> ✨. Estoy aquí para darte acceso inmediato al mundo Premium.<br/><br/>¿Buscas <b>liberarte del aburrimiento</b> con el mejor streaming 🍿 o prefieres <b>potenciar tu éxito</b> con herramientas PRO? 🚀' 
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-open chat after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const toggleChat = () => setIsOpen(!isOpen);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const formatText = (text: string) => {
        if (!text) return '';
        let formatted = text;
        formatted = formatted.replace(/\*\*([\s\S]*?)\*\*/g, '<b>$1</b>');
        formatted = formatted.replace(/([^\\]|^)\*([^\s*][^*]*?)\*/g, '$1<i>$2</i>');
        formatted = formatted.replace(/\n/g, '<br />');
        return formatted;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
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

    if (!visible) return null;

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white/95 dark:bg-slate-900/95 rounded-[2rem] shadow-2xl flex flex-col z-[80] border border-slate-200 dark:border-white/10 font-sans transition-all duration-300 ease-in-out transform origin-bottom-right backdrop-blur-xl">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-4 rounded-t-[2rem] flex justify-between items-center text-white shadow-lg border-b border-white/10">
                        <div className="flex items-center space-x-3">
                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/30 shadow-inner relative bg-white/10 backdrop-blur-md flex items-center justify-center">
                                <span className="text-2xl filter drop-shadow-md brightness-110 contrast-110" role="img" aria-label="MI_A Avatar">✨</span>
                            </div>
                            <div>
                                <span className="font-bold block leading-none tracking-tight text-lg">MI_A</span>
                                <span className="text-[10px] text-white/80 flex items-center gap-1.5 uppercase font-bold tracking-widest mt-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></span>
                                    En línea
                                </span>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-5 bg-slate-50/30 dark:bg-slate-950/30 space-y-4 custom-scrollbar">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-300 ${
                                    msg.role === 'user' 
                                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-indigo-200 dark:shadow-none' 
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-white/5 rounded-tl-none'
                                }`}>
                                   <div dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5 shadow-sm flex space-x-2 items-center">
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 rounded-b-[2rem]">
                        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/80 rounded-full px-1.5 py-1.5 border border-slate-200 dark:border-white/5 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe tu consulta aquí..."
                                className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:ring-0 outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-90"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
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
                className={`fixed bottom-6 right-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 flex items-center justify-center rounded-full shadow-[0_8px_25px_rgba(79,70,229,0.4)] hover:shadow-[0_12px_30px_rgba(79,70,229,0.5)] hover:scale-110 active:scale-95 transition-all duration-500 z-[80] group border border-white/20 ${isOpen ? 'w-14 h-14' : 'h-14 px-6 gap-3'}`}
                aria-label={isOpen ? "Cerrar chat" : "Chatea con MI_A"}
            >
                 {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white transition-transform duration-300 rotate-0 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 ) : (
                    <>
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/30">
                            <span className="text-xl filter brightness-110 contrast-110" role="img" aria-label="MI_A Icon">✨</span>
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></span>
                            </span>
                        </div>
                        <span className="text-white font-extrabold text-sm tracking-widest drop-shadow-sm uppercase">CHATEA CON MI_A</span>
                    </>
                 )}
            </button>
        </>
    );
};

export default ChatBot;
