import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../styles/loader.css';
import supabase from '../config/databaseClient';

const TherapistDetails = () => {
    const {id} = useParams();
    const [therapist, setTherapist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTherapistDetails = async () => {
            setLoading(true);
            try {
                const {data: doctor, error} = await supabase
                    .from('doctors')
                    .select('doctor_id, first_name, last_name, experience, city, specialization, doc_photo')
                    .eq('doctor_id', id)
                    .single();

                if (error) throw error;
                setTherapist(doctor);
            } catch (error) {
                console.error('Error fetching therapist details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTherapistDetails();
    }, [id]);

    if (loading) {
        return (
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
        )
    }

    if (!therapist) {
        return <div>Therapist not found.</div>;
    }

    return (
        <div className="therapist-detail-page">
            <h1>{therapist.first_name} {therapist.last_name}</h1>
            <img src={therapist.doc_photo} alt={therapist.first_name}/>
            <p>Experience: {therapist.experience} years</p>
            <p>City: {therapist.city}</p>
            <p>Specialization: {therapist.specialization}</p>
        </div>
    );
};

export default TherapistDetails;
