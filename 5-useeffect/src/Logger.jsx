import React from 'react'
import { useEffect } from 'react'

function Logger() {

    useEffect(() => {
        console.log("Component ekrana basıldı (mount edildi).");
    }, []);

    return (
        <p>Konsolu kontrol et</p>
    )
}

export default Logger