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
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientData = async () => {
            const storedPatientId = localStorage.getItem('patient_id');
            console.log(storedPatientId);

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

        const fetchAppointments = async () => {
            const storedPatientId = localStorage.getItem('patient_id');

            const {data, error} = await supabase
                .from('times')
                .select('doctor_id, date')
                .eq('patient', storedPatientId);

            if (error) {
                console.error('Помилка завантаження записів:', error.message);
            } else {
                const appointmentsWithDoctorNames = await Promise.all(
                    data.map(async (appointment) => {
                        const {data: doctorData, error: doctorError} = await supabase
                            .from('doctors')
                            .select('first_name, last_name')
                            .eq('doctor_id', appointment.doctor_id)
                            .single();

                        if (doctorError) {
                            console.error('Помилка завантаження лікаря:', doctorError.message);
                        } else {
                            return {
                                ...appointment,
                                doctor_name: `${doctorData.first_name} ${doctorData.last_name}`,
                            };
                        }
                    })
                );

                setAppointments(appointmentsWithDoctorNames);
            }
        };

        fetchPatientData();
        fetchAppointments();
    }, [patient_id, navigate]);

    const handleBookSession = () => {
        navigate('/all-therapists');
    };

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
                                    className="info-label">Ім'я:</span> {patientData.first_name}</p>
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
                                    className="info-label">Адреса:</span> {patientData.address}</p>
                            </section>
                        </div>
                        <div className="card-two">
                            <section className="section">
                                <h2 className="section-title">Мої записи</h2>
                                {appointments.length > 0 ? (
                                    appointments.map((appointment, index) => (
                                        <div key={index} className="appointment-item">
                                            <p><span className="info-label">Спеціаліст:</span> {appointment.doctor_name}
                                            </p>
                                            <p><span
                                                className="info-label">Дата і час:</span> {new Date(appointment.date).toLocaleString()}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <p>У вас немає записів на прийом.</p>
                                        <button className="book-session-btn" onClick={handleBookSession}>Забронювати
                                            сеанс
                                        </button>
                                    </div>
                                )}
                            </section>
                        </div>
                        <Footer/>
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
        </>
    );
};

export default UserPage;
