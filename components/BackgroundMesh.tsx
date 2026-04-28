import React, { useEffect, useRef } from 'react';

const BackgroundMesh = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        // Lógica de partículas simplificada (conectividad)
        const particles: {x: number, y: number, vx: number, vy: number}[] = [];
        for (let i = 0; i < 50; i++) {
            particles.push({ 
                x: Math.random() * width, y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 
            });
        }

        const animate = () => {
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if(p.x < 0 || p.x > width) p.vx *= -1;
                if(p.y < 0 || p.y > height) p.vy *= -1;
                
                ctx.fillStyle = '#6366f1';
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };
        
        animate();
    }, []);

    return <canvas id="bg-canvas" ref={canvasRef} />;
};

export default BackgroundMesh;
