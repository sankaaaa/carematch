import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
            case '20-30': return age >= 20 && age <= 30;
            case '31-40': return age >= 31 && age <= 40;
            case '41-50': return age >= 41 && age <= 50;
            case '50+': return age > 50;
            case 'Неважливо': return true;
            default: return true;
        }
    };

    useEffect(() => {
        const fetchTherapistsByCategory = async () => {
            try {
                const { data: categoryData, error: categoryError } = await supabase
                    .from('categories')
                    .select('category_id, name');

                if (categoryError) throw categoryError;

                const selectedCategoryIds = categoryData
                    .filter(category => filters.specialization.includes(category.name))
                    .map(category => category.category_id);

                const { data: doctorCategoriesData, error: doctorCategoriesError } = await supabase
                    .from('doctor_categories')
                    .select('doctor_id')
                    .in('category_id', selectedCategoryIds);

                if (doctorCategoriesError) throw doctorCategoriesError;

                const doctorIds = [...new Set(doctorCategoriesData.map(doc => doc.doctor_id))];

                const { data: doctorsData, error: doctorsError } = await supabase
                    .from('doctors')
                    .select('*')
                    .in('doctor_id', doctorIds);

                if (doctorsError) throw doctorsError;

                const filteredTherapists = doctorsData.filter(therapist => {
                    const age = calculateAge(therapist.doc_date);
                    let matches = true;

                    if (filters.gender && filters.gender !== 'Неважливо') {
                        const genderMatch = filters.gender === therapist.doc_sex;
                        if (!genderMatch) matches = false;
                    }

                    if (filters.age && !isAgeMatch(age, filters.age)) {
                        matches = false;
                    }

                    return matches;
                });

                setTherapists(filteredTherapists);
            } catch (error) {
                console.error('Error fetching therapists:', error.message);
            }
        };

        fetchTherapistsByCategory();
    }, [filters]);

    return (
        <div>
            <Header />
            <div className="therapist-results">
                <h2>Результати пошуку</h2>
                {therapists.length > 0 ? (
                    <div className="results-container">
                        {therapists.map((therapist) => (
                            <div key={therapist.doctor_id} className="therapist-info">
                                <p><strong>Ім'я:</strong> {therapist.first_name}</p>
                                <p><strong>Досвід:</strong> {therapist.experience} років</p>
                                <p><strong>Місце роботи:</strong> {therapist.workFormat}</p>
                                <p><strong>ID лікаря:</strong> {therapist.doctor_id}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Не знайдено терапевтів за заданими критеріями.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default TherapistResults;
