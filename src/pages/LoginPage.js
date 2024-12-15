import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/login.css';
import {ReactComponent as Frame} from '../assets/Frame.svg';
import googleIcon from '../assets/google.png';
import supabase from '../config/databaseClient';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email && password) {
            try {
                const { data, error } = await supabase
                    .from('doctors')
                    .select('*')
                    .or(`doc_login.eq.${email},email.eq.${email}`)
                    .eq('doc_password', password)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    console.log('Логін успішний: ', data);
                    navigate('/main');
                } else {
                    setError('Невірний логін або пароль');
                }
            } catch (error) {
                console.error('Помилка при логіні: ', error.message);
                setError('Сталася помилка при вході');
            }
        } else {
            setError('Будь ласка, введіть всі дані');
        }
    };

    return (
        <div className="login-page">
            <div className="logo">
                <Frame className="frameIcon"/>
                <div className="logoText">CareMatch</div>
            </div>

            <div className="login-container">
                <div className="header">
                    <h2>З поверненням!</h2>
                    <p>Введіть свої дані для входу в обліковий запис</p>
                </div>


                <button className="google-button">
                    <img src={googleIcon} alt="Google Icon" className="google-icon"/> Увійти з Google
                </button>

                <div className="divider">або</div>

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Email/Логін"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="options">
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        Запам’ятати мене
                    </label>
                    <Link to="/forgot-password" className="forgot-password-link">Забув/-ла пароль</Link>
                </div>

                <button className="login-button" onClick={handleLogin}>Вхід</button>
                {error && <div className="error">{error}</div>}
            </div>

            <div className="pattern"></div>
        </div>
    );
};

export default LoginPage;
