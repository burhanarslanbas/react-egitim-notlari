import React from 'react'

export const users = [
    {
        username: 'baris',
        password: '1234'
    },
    {
        username: 'ali',
        password: '1234'
    }
]

function Login() {
    return (
        //Fragment (Kapsayıcı) kullanımı
        <div>
            <div>
                <p>Kullanıcı Adınız</p>
                <input type="text" />
            </div>
            <div>
                <p>Şifreniz</p>
                <input type="password" />
            </div>
            <button>Giriş Yap</button>
        </div>
    )
}

// export ve export default farkı:
// export default: componentin tümüyle export edilmesini sağlar. import ederken {} kullanmaya gerek yoktur.
// export: componentin sadece bir kısmını export eder. import ederken {} kullanmak gerekir.
export default Login
