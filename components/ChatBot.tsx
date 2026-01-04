
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
            text: '¡Hola! Soy <b>MI_A</b> ✨<br/><br/>¿Qué experiencia premium vamos a disfrutar hoy? 🍿🤖' 
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

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
            setMessages(prev => [...prev, { role: 'model', text: 'Lo siento, tuve un inconveniente. Escríbenos por WhatsApp para darte atención personalizada.' }]);
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
            {isOpen && (
                <div className="fixed bottom-20 md:bottom-24 right-4 md:right-6 w-[80vw] sm:w-[320px] h-[400px] md:h-[440px] bg-white/95 dark:bg-slate-900/95 rounded-[1.5rem] shadow-2xl flex flex-col z-[180] border border-slate-200 dark:border-white/10 font-sans transition-all duration-300 ease-in-out transform origin-bottom-right backdrop-blur-xl">
                    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-2 md:p-3 rounded-t-[1.5rem] flex justify-between items-center text-white shadow-lg border-b border-white/10">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border-2 border-white/30 shadow-inner relative bg-white/10 backdrop-blur-md flex items-center justify-center">
                                <span className="text-lg md:text-xl filter drop-shadow-md" role="img" aria-label="MI_A Avatar">✨</span>
                            </div>
                            <div>
                                <span className="font-bold block leading-none tracking-tight text-sm md:text-base">MI_A</span>
                                <span className="text-[7px] md:text-[8px] text-white/80 flex items-center gap-1 uppercase font-bold tracking-widest mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                    EN LÍNEA
                                </span>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="p-1.5 hover:bg-white/20 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-slate-50/30 dark:bg-slate-950/30 space-y-3 custom-scrollbar">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[90%] p-2.5 md:p-3 rounded-xl text-[11px] md:text-xs leading-relaxed shadow-sm transition-all duration-300 ${
                                    msg.role === 'user' 
                                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none' 
                                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-white/5 rounded-tl-none'
                                }`}>
                                   <div dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl rounded-tl-none border border-slate-100 dark:border-white/5 shadow-sm flex space-x-1.5 items-center">
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 md:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 rounded-b-[1.5rem]">
                        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800/80 rounded-full px-1 py-0.5 border border-slate-200 dark:border-white/5">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Haz tu consulta..."
                                className="flex-1 bg-transparent border-none px-2.5 py-1.5 text-[11px] md:text-xs focus:ring-0 outline-none text-slate-800 dark:text-slate-100"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="p-1.5 md:p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 disabled:opacity-50 shadow-md active:scale-90"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={toggleChat}
                className={`fixed bottom-6 right-4 md:right-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 flex items-center justify-center rounded-full shadow-[0_10px_35px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-500 z-[180] group border border-white/20 ${isOpen ? 'w-8 h-8 md:w-10 md:h-10' : 'h-9 px-4 md:h-11 md:px-6 gap-2 md:gap-3'}`}
                aria-label={isOpen ? "Cerrar chat" : "Chatea con MI_A"}
            >
                 {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 ) : (
                    <>
                        <div className="relative flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/40">
                            <span className="text-sm md:text-base" role="img" aria-label="MI_A Icon">✨</span>
                        </div>
                        <span className="text-white font-black text-[9px] md:text-xs tracking-[0.15em] uppercase whitespace-nowrap">Chatea con MI_A ✨</span>
                    </>
                 )}
            </button>
        </>
    );
};

export default ChatBot;
