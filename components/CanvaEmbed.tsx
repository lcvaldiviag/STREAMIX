import React from 'react';

const CanvaEmbed = () => {
    return (
        <div className="w-full h-full overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
            <iframe 
                loading="lazy" 
                style={{ width: '100%', height: '500px', border: 'none' }} 
                src="https://www.canva.com/design/DAG4fpu7LAw/pl_pXRaGYpEtLlZX7dU_UA/view?embed" 
                allowFullScreen={true}
                allow="fullscreen"
                title="Catálogo Streamix"
            />
        </div>
    );
};

export default CanvaEmbed;
