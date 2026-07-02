import React from 'react'
import './LoginForm.css'

function Counter() {
    const [count, setCount] = React.useState(0);

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

        <div className="login-container">
            <div className="login-form">
                <h2> Counter Component</h2>
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