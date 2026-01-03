
import React, { useEffect, useState } from 'react';

const SparkleCursor = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const handleMouseMove = (e: MouseEvent) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Sparkle effect
            if (Math.random() > 0.88) {
                const sparkle = document.createElement('span');
                sparkle.className = 'sparkle';
                sparkle.innerHTML = '✨';
                sparkle.style.left = e.clientX + 'px';
                sparkle.style.top = e.clientY + 'px';
                
                const offset = 20;
                sparkle.style.marginLeft = (Math.random() * offset - offset/2) + 'px';
                sparkle.style.marginTop = (Math.random() * offset - offset/2) + 'px';

                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 800);
            }
        };

        const handleMouseDown = () => cursor.classList.add('active');
        const handleMouseUp = () => cursor.classList.remove('active');

        // Check if hovering interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('button, a, .cursor-pointer')) {
                cursor.classList.add('active');
            } else {
                cursor.classList.remove('active');
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            cursor.remove();
        };
    }, []);

    return null;
};

export default SparkleCursor;
