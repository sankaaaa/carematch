import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import TerapistCard from "../components/TerapistCard";
import "../styles/terapists-page.css";
import supabase from '../config/databaseClient';
import FilterComponent from '../components/FilterComponent';

const AllTerapistsPage = () => {
    const [therapists, setTherapists] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const {data: doctors, error: doctorsError} = await supabase
                    .from('doctors')
                    .select('doctor_id, first_name, last_name, specialization, experience, meet_fomat, city, doc_photo');

                if (doctorsError) throw doctorsError;

                const {data: doctorCategories, error: doctorCategoriesError} = await supabase
                    .from('doctor_categories')
                    .select('doctor_id, category_id');

                if (doctorCategoriesError) throw doctorCategoriesError;

                const {data: categoriesData, error: categoriesError} = await supabase
                    .from('categories')
                    .select('category_id, name');

                if (categoriesError) throw categoriesError;

                setCategories(categoriesData || []);

                const categoryMap = {};
                categoriesData.forEach(category => {
                    categoryMap[category.category_id] = category.name;
                });

                const formatExperience = (years) => {
                    const lastDigit = years % 10;
                    const lastTwoDigits = years % 100;

                    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
                        return `${years} років`;
                    }

                    if (lastDigit === 1) {
                        return `${years} рік`;
                    }

                    if (lastDigit >= 2 && lastDigit <= 4) {
                        return `${years} роки`;
                    }

                    return `${years} років`;
                };

                const formattedTherapists = doctors.map(doctor => {
                    const doctorSpecialties = doctorCategories
                        .filter(dc => dc.doctor_id === doctor.doctor_id)
                        .map(dc => ({
                            id: dc.category_id,
                            name: categoryMap[dc.category_id],
                        }))
                        .sort((a, b) => a.id - b.id)
                        .map(category => category.name);

                    const professions = doctor.specialization
                        ? doctor.specialization.split(',').map(prof => prof.trim())
                        : [];

                    let location = doctor.meet_fomat;
                    if (doctor.meet_fomat.includes('Офлайн')) {
                        location = doctor.meet_fomat.replace('Офлайн', `Офлайн: ${doctor.city}`);
                    }

                    return {
                        doctor_id: doctor.doctor_id,
                        name: `${doctor.first_name} ${doctor.last_name}`,
                        experience: formatExperience(doctor.experience),
                        location: location,
                        professions: professions,
                        specialties: doctorSpecialties,
                        photo: doctor.doc_photo,
                    };
                });

                formattedTherapists.sort((a, b) => a.doctor_id - b.doctor_id);
                setTherapists(formattedTherapists);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilter = (selected) => {
        setSelectedCategories(selected);
    };

    const filteredTherapists = therapists.filter(therapist =>
        selectedCategories.length === 0 ||
        therapist.specialties.some(specialty => selectedCategories.includes(specialty))
    );

    return (
        <div className="all-terapists-container">
            <Header/>
            <FilterComponent categories={categories} onFilter={handleFilter}/>
            {loading ? (
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
            ) : (
                <div className="cards-container">
                    {filteredTherapists.map((therapist, index) => (
                        <TerapistCard key={index} {...therapist} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllTerapistsPage;
