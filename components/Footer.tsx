import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.846 6.075l-1.269 4.625 4.759-1.249z" />
    </svg>
);

const Footer = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
    return (
        <footer className="bg-slate-100 text-gray-800 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-gray-600 text-center md:text-left">
                        <p>Phone: +{WHATSAPP_NUMBER}</p>
                        <p className="mt-2">&copy; {new Date().getFullYear()} STREAMIX. All rights reserved.</p>
                    </div>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800 transition-colors">
                            <span className="sr-only">WhatsApp Support</span>
                            <WhatsAppIcon />
                        </a>
                        <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Terms of Service</a>
                    </div>
                </div>
                 <p className="text-center text-lg font-bold text-gray-800 mt-4">
                    Reliable streaming, as it should be.
                 </p>
            </div>
        </footer>
    );
};

export default Footer;