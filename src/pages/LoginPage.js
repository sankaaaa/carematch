import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/login.css';
import {ReactComponent as Frame} from '../assets/Frame.svg';
import googleIcon from '../assets/google.png';
import supabase from '../config/databaseClient';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email && password) {
            try {
                let {data, error} = await supabase
                    .from('doctors')
                    .select('doctor_id')
                    .or(`doc_login.eq.${email},email.eq.${email}`)
                    .eq('doc_password', password);

                if (error) {
                    throw error;
                }

                if (data.length === 1) {
                    console.log('Лікар увійшов успішно: ', data[0]);
                    localStorage.setItem('doctor_id', data[0].doctor_id);
                    localStorage.setItem('status', 'doctor');
                    navigate('/main');
                } else {
                    const {data: patientData, error: patientError} = await supabase
                        .from('patients')
                        .select('patient_id')
                        .or(`pat_login.eq.${email},email.eq.${email}`)
                        .eq('pat_password', password);

                    if (patientError) {
                        throw patientError;
                    }

                    if (patientData.length === 1) {
                        console.log('Пацієнт увійшов успішно: ', patientData[0]);
                        localStorage.setItem('patient_id', patientData[0].patient_id);
                        localStorage.setItem('status', 'patient');
                        navigate('/main');
                    } else {
                        setError('Невірний логін або пароль');
                        localStorage.removeItem('patient_id');
                        localStorage.removeItem('doctor_id');
                    }
                }
            } catch (error) {
                console.error('Помилка при логіні: ', error.message);
                setError('Сталася помилка при вході');
                localStorage.removeItem('patient_id');
                localStorage.removeItem('doctor_id');
            }
        } else {
            setError('Будь ласка, введіть всі дані');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
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
                        onKeyDown={handleKeyPress}
                    />
                </div>

                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </div>

                <div className="options">
                    <Link to="/create-account" className="create-account-button">
                        Створити акаунт
                    </Link>
                    <Link to="/forgot-password" className="forgot-password-link">
                        Забув/-ла пароль
                    </Link>
                </div>

                <button className="login-button" onClick={handleLogin}>
                    Вхід
                </button>
                {error && <div className="error">{error}</div>}
            </div>

            <div className="pattern"></div>
        </div>
    );
};

export default LoginPage;
