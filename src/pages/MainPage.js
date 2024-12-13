import React from 'react';
import Header from '../components/Header';
import '../styles/main_style.css';
import {Button} from "@nextui-org/react";
import mainImage from '../assets/main.png';


const MainPage = () => {
    return (
        <div className="main-container">
            <Header/>
            <div className="content">
                <img
                    className="placeholder-image"
                    src={mainImage}
                    alt="Placeholder"
                />

                <div className="text-section">
                    <h1 className="main-title">
                        Знайдіть спеціаліста, який Вас підтримає
                    </h1>

                    <p className="main-description">
                        Ви не самотні. Ми тут, щоб надати необхідну підтримку та допомогу.
                    </p>

                    <div className="button-group">
                        <Button className="primary-button">
                            Підібрати фахівця
                        </Button>

                        <span className="separator">або</span>

                        <Button className="secondary-button">
                            Усі фахівці
                        </Button>
                    </div>
                </div>
            </div>


            <div className="stats-block">
                <div className="stat-item stat-item-1">
                    <span className="stat-value">50 000+</span>
                    <span className="stat-description">сесій проведено</span>
                </div>
                <div className="stat-item stat-item-2">
                    <span className="stat-value">97%</span>
                    <span className="stat-description">позитивних відгуків</span>
                </div>
                <div className="stat-item stat-item-3">
                    <span className="stat-value">3хв</span>
                    <span className="stat-description">час пошуку фахівця</span>
                </div>
                <div className="stat-item stat-item-4">
                    <span className="stat-value">200+</span>
                    <span className="stat-description">перевірених фахівців</span>
                </div>
            </div>

        </div>
    );
};

export default MainPage;
