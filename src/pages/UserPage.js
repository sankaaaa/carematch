import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import supabase from '../config/databaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/loader.css';
import '../styles/user-page.css';

const UserPage = () => {
    const {patient_id} = useParams();
    const [patientData, setPatientData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientData = async () => {
            const storedPatientId = localStorage.getItem('patient_id');
            console.log(storedPatientId)

            const {data, error} = await supabase
                .from('patients')
                .select('first_name, last_name, date_of_birth, gender, email, phone_number, address')
                .eq('patient_id', storedPatientId)
                .single();

            if (error) {
                console.error('Помилка завантаження даних:', error.message);
                alert('Не вдалося завантажити дані пацієнта.');
            } else {
                setPatientData(data);
            }
        };

        fetchPatientData();
    }, [patient_id, navigate]);

    return (
        <>
            <Header/>
            <main>
                {patientData ? (
                    <div>
                        <div className="card">
                            <section className="section">
                                <h2 className="section-title">Мої дані</h2>
                                <p className="info-item"><span
                                    className="info-label">Ім'я:</span> {patientData.first_name}
                                </p>
                                <p className="info-item"><span
                                    className="info-label">Прізвище:</span> {patientData.last_name}</p>
                                <p className="info-item"><span
                                    className="info-label">Дата народження:</span> {patientData.date_of_birth}</p>
                                <p className="info-item"><span className="info-label">Стать:</span> {patientData.gender}
                                </p>
                            </section>
                            <section className="section">
                                <h1 className="section-title">Контакти</h1>
                                <p className="info-item"><span className="info-label">Email:</span> {patientData.email}
                                </p>
                                <p className="info-item"><span
                                    className="info-label">Телефон:</span> {patientData.phone_number}</p>
                                <p className="info-item"><span
                                    className="info-label">Адреса:</span> {patientData.address}
                                </p>
                            </section>
                        </div>
                        <div className="card">
                            <section className="section">
                                <h2 className="section-title">Мої записи</h2>
                            </section>
                        </div>
                    </div>
                ) : (
                    <div className="banter-loader">
                        <div className="banter-loader__box"></div>
                        <div className="banter-loader__box"></div>
                        <div className="banter-loader__box"></div>
                        <div className="banter-loader__box"></div>
                        <div className="banter-loader__box"></div>
                        <div className="banter-loader__box"></div>
                        <div className="banter-loader__box"></div>
                        <div className="banter-loader__box"></div>
                        <div className="banter-loader__box"></div>
                    </div>
                )}
            </main>
            <Footer/>
        </>
    );

};

export default UserPage;
