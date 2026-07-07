import React, { use, useState, useEffect } from 'react'
import '../css/currency.css'
import { TiArrowRight } from "react-icons/ti";
import axios from 'axios';


function Currency() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("EUR");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState(0);

    let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
    let API_KEY = "fca_live_NWgJCpfNQV1BZREN3otlAIGAOEzJ3P4ld72XdQ3G";

    const exchange = async () => {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
        setResult((response.data.data[toCurrency] * amount).toFixed(2));
    }

    // Program ilk render edildiğinde exchange fonksiyonunu çağırmak için useEffect kullanıyoruz.
    // Bunu kendim düşündüm, yihuuu
    useEffect(() => {
        exchange();
    }, []);

    return (
        <div className='currency-div'>
            <div style={{ width: '100%', fontFamily: 'arial', backgroundColor: 'black', color: "white", textAlign: 'center' }}>
                <h3>Exchange App</h3>
            </div>
            <div style={{ marginTop: '30px' }}>
                <input type="number" className='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                <select onChange={(e) => setFromCurrency(e.target.value)} className='from-currency-opt'>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>TRY</option>
                </select>

                <TiArrowRight style={{ fontSize: '35px', marginRight: '10px', marginBottom: '-10px' }} />

                <select onChange={(e) => setToCurrency(e.target.value)} className='to-currency-opt'>
                    <option>TRY</option>
                    <option>USD</option>
                    <option>EUR</option>
                </select>

                <input value={result} onChange={(e) => setResult(e.target.value)} type="number" className='result' />
            </div>
            <div>
                <button onClick={exchange} className='exchange-btn'>Çevir</button>
            </div>
        </div>
    )
}

export default Currency