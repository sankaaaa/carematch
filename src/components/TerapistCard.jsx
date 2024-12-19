import React from 'react';
import "../styles/terapist-card.css";

const TerapistCard = ({ name, experience, location, sessions, reviews, price, specialties, professions }) => {
    return (
        <div className="card-terapist">
            <div className="profile-image">
                <div className="placeholder-image"></div>
            </div>
            <h2 className="name">{name}</h2>
            <div className="info-professions">
                <div className="details-container">
                    <p className="details">{experience} досвіду</p>
                    <p className="details">Офлайн: {location}</p>
                    <p className="details">{sessions} сесій / {reviews} відгук</p>
                </div>
                <div className="professions">
                    <div className="price">{price}₴</div>
                    {professions.map((profession, index) => (
                        <span key={index} className="profession">{profession}</span>
                    ))}
                </div>
            </div>
            <span>З чим працюю:</span>
            <div className="specialties">
                {specialties.map((specialty, index) => (
                    <span key={index} className="specialty">{specialty}</span>
                ))}
            </div>

            <button className="more-button">Дізнатися більше</button>
        </div>
    );
};

export default TerapistCard;
