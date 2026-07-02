import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function Counter() {
    const [count, setCount] = React.useState(0);

    useEffect(() => {
        console.log("count değişti, yeni değer: " + count);
    }, [count]);

    const handleIncrement = () => {
        setCount(count + 1);
    }

    const handleIncrementTwice = () => {
        setCount(count + 1);
        setCount(count + 1);
    }

    const handleIncrementTwiceSafe = () => {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    }

    return (

        <div>
            <div>
                <h2>Counter Component</h2>
                <h2>Sayaç: {count}</h2>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={handleIncrement}>1 Arttır</button>
                    <button onClick={handleIncrementTwice}>2 Arttır (Riskli)</button>
                    <button onClick={handleIncrementTwiceSafe}>2 Arttır (Güvenli)</button>
                </div>
            </div>
        </div>
    )
}

export default Counter

rfce