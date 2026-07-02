import React from 'react'
import { useEffect } from 'react'

function LiveClock() {
    const [time, setTime] = React.useState(new Date());

    useEffect(() => {
        console.log("Saat başlatıldı!");

        // setInterval fonksiyonu ile her saniye güncellenen bir saat oluşturuyoruz
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Cleanup fonksiyonu, bileşen unmount olduğunda interval'i temizler
        return () => {
            clearInterval(intervalId);
            console.log("Saat temizlendi!");
        }
    }, []); // // boş array → sadece bir kere kurulur
    return (
        <p>Şu an: {time.toLocaleTimeString()}</p>
    )
}

export default LiveClock