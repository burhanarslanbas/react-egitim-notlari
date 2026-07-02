import React from 'react'
import './LoginForm.css'

function LoginForm() {
    // formData Object State: Kullanıcı adı ve şifreyi saklamak için bir state oluşturuyoruz.
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    // handleChange: Kullanıcı adı ve şifre inputlarının değişimini yakalayan fonksiyon
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // handleSubmit: Formun gönderilmesini yakalayan fonksiyon
    const handleSubmit = (e) => {
        e.preventDefault(); // Formun varsayılan submit davranışını engelle

        // Basit doğrulama: Kullanıcı adı ve şifre alanlarının boş olup olmadığını kontrol et
        if (!formData.username || !formData.password) {
            setErrorMessage('Kullanıcı adı ve şifre alanları boş bırakılamaz.');
            return;
        }
        setErrorMessage(null);
        setIsLoading(true);

        // Şimdilik simülasyon — Axios kısmına gelince gerçek API isteğiyle değiştireceğiz
        setTimeout(() => { // setTimeout: Geçici olarak bir gecikme simüle etmek için kullanılır
            setIsLoading(false); // Gecikme tamamlandığında yükleme durumunu false yap
            alert(`Giriş başarılı! Kullanıcı adı: ${formData.username}, Şifre: ${formData.password}`);
        }, 1000); // 1 saniyelik gecikme simülasyonu
    }
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Giriş Yap</h2>

                <div className="form-group">
                    <label htmlFor="username">Kullanıcı Adı:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Kullanıcı adınızı girin"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Şifre:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Şifrenizi girin"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </button>
            </form>
        </div>
    );
}

export default LoginForm