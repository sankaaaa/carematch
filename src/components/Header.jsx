import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../styles/header.module.css';
import {ReactComponent as Frame} from '../assets/Frame.svg';
import {ReactComponent as Logout} from '../assets/logout.svg';
import {Button} from '@nextui-org/react';

function Header() {
    const navigate = useNavigate();
    const status = localStorage.getItem('status');

    const handleAllTerapists = () => {
        navigate('/all-therapists');
    };

    const handleFindTherapist = () => {
        navigate('/find-therapist');
    };

    const handleMyPage = () => {
        const patientId = localStorage.getItem('patient_id');
        if (patientId) {
            navigate(`/my-account/${patientId}`);
        } else {
            alert('Будь ласка, увійдіть у свій акаунт');
            navigate('/login');
        }
    };

    const handleMyDocPage = () => {
        const doctorId = localStorage.getItem('doctor_id');
        if (doctorId) {
            navigate(`/my-doc-account/${doctorId}`);
        } else {
            alert('Будь ласка, увійдіть у свій акаунт');
            navigate('/login');
        }
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            window.scrollTo({
                top: sectionTop - 20,
                behavior: 'smooth',
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('status');
        localStorage.removeItem('patient_id');
        localStorage.removeItem('doctor_id');
        sessionStorage.removeItem('status');
        sessionStorage.removeItem('patient_id');
        sessionStorage.removeItem('doctor_id');
        navigate('/login');
    };


    const handleAboutUsClick = () => {
        navigate('/main', {replace: true});
        setTimeout(() => scrollToSection('stats-block'), 100);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Frame className={styles.frameIcon}/>
                <div className={styles.logoText}>CareMatch</div>
            </div>

            <div className={styles.navLinkWrapper}>
                <button onClick={handleAboutUsClick} className={styles.navLink}>
                    Про нас
                </button>
                <Button onPress={handleAllTerapists} className={styles.navLink}>
                    Фахівці
                </Button>
                <Button onPress={handleFindTherapist} className={styles.navLink}>
                    Підібрати фахівця
                </Button>

                {status === 'patient' && (
                    <Button onPress={handleMyPage} className={styles.navLink}>
                        Мій кабінет
                    </Button>
                )}

                {status === 'doctor' && (
                    <Button onPress={handleMyDocPage} className={styles.navLink}>
                        Мій кабінет
                    </Button>
                )}

                <button onClick={handleLogout} className={styles.navLink}>
                    <div className={styles.logoutWrapper}>
                        <Logout className={styles.logoutIcon}/>
                        <span>Вийти</span>
                    </div>
                </button>
            </div>
        </header>
    );
}

export default Header;
