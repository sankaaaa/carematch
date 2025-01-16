import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import supabase from '../config/databaseClient';

const TherapistResults = () => {
    const [therapists, setTherapists] = useState([]);
    const location = useLocation();
    const filters = location.state || {};

    const calculateAge = (dateString) => {
        const birthDate = new Date(dateString);
        const ageDiff = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const isAgeMatch = (age, range) => {
        switch (range) {
            case '20-30':
                return age >= 20 && age <= 30;
            case '31-40':
                return age >= 31 && age <= 40;
            case '41-50':
                return age >= 41 && age <= 50;
            case '50+':
                return age > 50;
            default:
                return true;
        }
    };

    useEffect(() => {
        const fetchTherapists = async () => {
            const {data, error} = await supabase.from('doctors').select('*');

            if (error) {
                console.error('Error fetching therapists:', error.message);
                return;
            }

            const filteredTherapists = data.filter(therapist => {
                const age = calculateAge(therapist.doc_date);
                let matches = true;

                if (filters.gender && filters.gender !== 'Неважливо') {
                    const genderMatch = filters.gender === 'Чоловік' ? therapist.doc_sex === 'Чоловік' : therapist.doc_sex === 'Жінка';
                    if (!genderMatch) matches = false;
                }

                if (filters.age && !isAgeMatch(age, filters.age)) {
                    matches = false;
                }

                return matches;
            });

            setTherapists(filteredTherapists);
        };

        fetchTherapists();
    }, [filters]);

    return (
        <div>
            <Header/>
            <div className="therapist-results">
                <h2>Результати пошуку</h2>
                {Array.isArray(therapists) && therapists.length > 0 ? (
                    <div className="results-container">
                        {therapists.map((therapist) => (
                            <div key={therapist.doctor_id} className="therapist-info">
                                <p><strong>Ім'я:</strong> {therapist.first_name}</p>
                                <p><strong>Досвід:</strong> {therapist.experience} років</p>
                                <p><strong>Місце роботи:</strong> {therapist.workFormat}</p>
                                <p>
                                    <strong>Спеціалізації:</strong> {therapist.specialization ? therapist.specialization.split(',').join(', ') : 'Немає'}
                                </p>
                                <p><strong>ID лікаря:</strong> {therapist.doctor_id}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Не знайдено терапевтів за заданими критеріями.</p>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default TherapistResults;
