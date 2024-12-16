import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/header.module.css';
import { ReactComponent as Frame } from '../assets/Frame.svg';
import { ReactComponent as Logout } from '../assets/logout.svg';

function Header() {
    const navigate = useNavigate();

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
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Frame className={styles.frameIcon} />
                <div className={styles.logoText}>CareMatch</div>
            </div>

            <div className={styles.navLinkWrapper}>
                <button onClick={() => scrollToSection('stats-block')} className={styles.navLink}>
                    Про нас
                </button>
                <Link to="#section2" className={styles.navLink}>
                    Фахівці
                </Link>
                <Link to="#section3" className={styles.navLink}>
                    Підібрати фахівця
                </Link>
                <button onClick={handleLogout} className={styles.navLink}>
                    <div className={styles.logoutWrapper}>
                        <Logout className={styles.logoutIcon} />
                        <span>Вийти</span>
                    </div>
                </button>
            </div>
        </header>
    );
}

export default Header;
