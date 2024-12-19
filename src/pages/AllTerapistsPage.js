import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TerapistCard from "../components/TerapistCard"
import "../styles/terapists-page.css"

const therapists = [
    {
        name: 'Богдан Квасов',
        experience: '16 років',
        location: 'Київ',
        sessions: 200,
        reviews: 71,
        price: 1000,
        professions: ['Психіатр'],
        specialties: ['ПТСР', 'Депресія', 'Тривожні розлади', '+2']
    },
    {
        name: 'Марія Іваненко',
        experience: '10 років',
        location: 'Львів',
        sessions: 150,
        reviews: 45,
        price: 800,
        professions: ['Психолог'],
        specialties: ['ПТСР', 'Панічні атаки', 'Фобії']
    },
    {
        name: 'Олександр Петров',
        experience: '8 років',
        location: 'Одеса',
        sessions: 120,
        reviews: 60,
        price: 900,
        professions: ['Психіатр', 'Психолог'],
        specialties: ['Тривожність', 'Депресія']
    },
    {
        name: 'Ганна Бойко',
        experience: '12 років',
        location: 'Харків',
        sessions: 180,
        reviews: 55,
        price: 950,
        professions: ['Психолог'],
        specialties: ['ПТСР', 'Сімейні проблеми', 'Стрес']
    },
];

const AllTerapistsPage = () => {
    return (
        <div className="all-terapists-container">
            <Header />
            <div className="cards-container">
                {therapists.map((therapist, index) => (
                    <TerapistCard key={index} {...therapist} />
                ))}
            </div>
        </div>
    );
};

export default AllTerapistsPage;
