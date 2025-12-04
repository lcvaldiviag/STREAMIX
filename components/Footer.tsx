
import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.846 6.075l-1.269 4.625 4.759-1.249z" />
    </svg>
);

const FacebookIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const InstagramIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

const SOCIAL_LINKS = [
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61583680409539',
        icon: FacebookIcon,
        colorClass: 'bg-[#1877F2] hover:bg-[#166fe5]'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/streamix7/',
        icon: InstagramIcon,
        colorClass: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90'
    },
    {
        name: 'WhatsApp',
        url: `https://wa.me/${WHATSAPP_NUMBER}`,
        icon: WhatsAppIcon,
        colorClass: 'bg-[#25D366] hover:bg-[#22bf5b]'
    }
];

const Footer = () => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
    return (
        <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-white/10 relative z-10">
             {/* Subtle Glow at the top of footer */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-50"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
                        <p>Teléfono: <span className="text-slate-800 dark:text-slate-200 font-medium">+{WHATSAPP_NUMBER}</span></p>
                        <p className="mt-2">&copy; {new Date().getFullYear()} STREAMIX. Todos los derechos reservados.</p>
                    </div>
                    <div className="flex items-center space-x-6 mt-6 md:mt-0">
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 flex items-center space-x-2">
                             <WhatsAppIcon className="w-5 h-5" />
                             <span className="sr-only md:not-sr-only text-xs font-medium">Soporte</span>
                        </a>
                        <a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">Términos de Servicio</a>
                    </div>
                </div>
                
                <div className="flex flex-col items-center mt-12 mb-4">
                    <div className="flex space-x-6 mb-6">
                        {SOCIAL_LINKS.map((link) => (
                            <a 
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 hover:shadow-xl transition-all duration-300 ${link.colorClass} ring-2 ring-white dark:ring-slate-900`}
                                aria-label={`Visítanos en ${link.name}`}
                            >
                                <link.icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                    <p className="text-center text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-500 tracking-wide">
                        Streaming confiable, como debe ser.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
