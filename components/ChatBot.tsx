import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

interface ChatBotProps {
    visible?: boolean;
}

const ChatBot = ({ visible = true }: ChatBotProps) => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

    return (
        <div className={visible ? '' : 'hidden'}>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 flex items-center space-x-3 px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 z-40"
                aria-label="Chatea con AURA en WhatsApp"
            >
                <ChatIcon />
                <span className="text-white font-semibold pr-2 text-sm">CHATEA CON AURA</span>
            </a>
        </div>
    );
};

export default ChatBot;