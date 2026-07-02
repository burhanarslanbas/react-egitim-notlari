import React from 'react'
import { useState, useEffect } from 'react'

function WindowWidth() {
    // Pencere genişliğini takip etmek için bir state oluşturuyoruz
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {

        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Component kaldırıldığı zaman çalışan Cleanup fonksiyonu
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <p>Pencere genişliği: {width}px</p>
    )
}

export default WindowWidth