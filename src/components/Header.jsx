import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';
import { ReactComponent as Frame } from '../assets/Frame.svg';
import { ReactComponent as Logout } from '../assets/logout.svg';

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Frame className={styles.frameIcon} />
                <div className={styles.logoText}>CareMatch</div>
            </div>

            <div className={styles.navLinkWrapper}>
                <Link to="#section4" className={styles.navLink}>
                    Про нас
                </Link>
                <Link to="#section2" className={styles.navLink}>
                    Фахівці
                </Link>
                <Link to="#section3" className={styles.navLink}>
                    Підібрати фахівця
                </Link>
                <Link to="#logout" className={styles.navLink}>
                    <div className={styles.logoutWrapper}>
                        <Logout className={styles.logoutIcon} />
                        <span>Вийти</span>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default Header;
