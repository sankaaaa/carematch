import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/calendar.css';
import supabase from "../config/databaseClient";
import { ReactComponent as Frame } from '../assets/Frame.svg';

const TherCalendar = () => {
    const { id } = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [sessionDates, setSessionDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [sessionTime, setSessionTime] = useState(null);
    const [showSessionForm, setShowSessionForm] = useState(false);

    const monthNames = [
        'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const generateCalendar = () => {
        const daysOfMonth = [
            31, 28 + (isLeapYear(currentYear) ? 1 : 0), 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];

        const firstDay = new Date(currentYear, currentMonth);

        const days = [];
        for (let i = 0; i < firstDay.getDay(); i++) {
            days.push(<div key={`empty-${i}`}></div>);
        }

        for (let day = 1; day <= daysOfMonth[currentMonth]; day++) {
            const isSessionDay = sessionDates.some(session => new Date(session.date).getDate() === day);
            days.push(
                <div
                    key={day}
                    className={`
                            ${day === currentDate.getDate() && currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() ? 'current-date' : ''}
                            ${isSessionDay ? 'rehearsal-date' : ''}
                        `}                    onClick={() => handleDayClick(day, isSessionDay)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const handleDayClick = (day, isSessionDay) => {
        if (isSessionDay) {
            const selectedSession = sessionDates.find(session => new Date(session.date).getDate() === day);
            setSelectedDate(day);
            setSessionTime(selectedSession ? new Date(selectedSession.date).toLocaleTimeString() : null);
            setShowSessionForm(true);
        } else {
            setShowSessionForm(false);
        }
    };

    const handleConfirmSession = () => {
        console.log('Сеанс підтверджено для дати:', selectedDate);
        setShowSessionForm(false);
    };

    useEffect(() => {
        console.log('Doctor ID:', id);
        const fetchSessionDates = async () => {
            setLoading(true);

            // Перевірка на наявність doctor_id
            if (!id) {
                console.error('Doctor ID is undefined or missing');
                return;
            }

            const startDate = new Date(currentYear, currentMonth, 1).toISOString();
            const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59).toISOString();

            const { data, error } = await supabase
                .from('doctors')
                .select('date')
                .eq('doctor_id', id)  // Фільтруємо за doctor_id
                .gte('date', startDate)
                .lte('date', endDate);

            if (error) {
                console.error('Error fetching session dates:', error);
                return;
            }

            setSessionDates(data);
            setLoading(false);
        };

        fetchSessionDates();
    }, [currentMonth, currentYear, id]);


    const changeMonth = (direction) => {
        setLoading(true);
        if (direction === 'prev') {
            setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
            setCurrentYear(prevMonth => (prevMonth === 0 ? currentYear - 1 : currentYear));
        } else {
            setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
            setCurrentYear(prevMonth => (prevMonth === 11 ? currentYear + 1 : currentYear));
        }
    };

    return (
        <div className="container">
            <Frame className="leafIcon" />

            <div className="calendar">
                <div className="calendar-header">
                    <span className="month-picker">{currentYear}</span>
                    <div className="year-picker">
                        <span
                            id="pre-month"
                            style={{ cursor: 'pointer' }}
                            onClick={() => changeMonth('prev')}
                        >
                            &lt;
                        </span>
                        <span
                            id="month"
                            style={{ cursor: 'pointer', margin: '0 10px' }}
                        >
                            {monthNames[currentMonth]}
                        </span>
                        <span
                            id="next-month"
                            style={{ cursor: 'pointer' }}
                            onClick={() => changeMonth('next')}
                        >
                            &gt;
                        </span>
                    </div>
                </div>
                <div className="calendar-body">
                    <div className="calendar-week-days">
                        <div>Нд</div>
                        <div>Пн</div>
                        <div>Вт</div>
                        <div>Ср</div>
                        <div>Чт</div>
                        <div>Пт</div>
                        <div>Сб</div>
                    </div>
                    <div className="calendar-days">
                        {loading ? <div>Loading...</div> : generateCalendar()}
                    </div>
                </div>

                {showSessionForm && (
                    <div className="session-form">
                        <h4>
                            Дата запису: {selectedDate} {monthNames[currentMonth]} {currentYear}, {sessionTime}
                        </h4>
                        <button className="confirmsession" onClick={handleConfirmSession}>
                            Підтвердити сеанс
                        </button>
                    </div>
                )}
            </div>

            <Frame className="leafIcon" />
        </div>
    );
};

export default TherCalendar;
