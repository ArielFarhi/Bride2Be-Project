import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaComments, FaCogs, FaUserCircle } from "react-icons/fa"; 
import ProgressBar from "./ProgressBar";

function HomePage({ user }) {
    const [countdown, setCountdown] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const weddingDate = new Date(user.weddingDate);

        const calculateCountdown = () => {
            const now = new Date();
            const timeDiff = weddingDate - now;

            if (timeDiff > 0) {
                const days = String(Math.floor(timeDiff / (1000 * 60 * 60 * 24))).padStart(2, "0");
                const hours = String(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
                const minutes = String(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
                setCountdown({ days, hours, minutes });
            }
        };

        calculateCountdown();
        const timer = setInterval(calculateCountdown, 1000 * 60);

        return () => clearInterval(timer);
    }, [user.weddingDate]);

    const handleProgressBarClick = () => {
        navigate("/checklist");
    };

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div>
            <div className="home-page">
                <img
                    src="./images/Bride&Groom.webp"
                    alt="Couple"
                    className="couple-image"
                />
                <div className="countdown-circle-container">
                    <div className="circle">
                        <div className="circle-content">
                            <p className="circle-number">{countdown.days}</p>
                            <p className="circle-label">Days</p>
                        </div>
                    </div>
                    <div className="circle">
                        <div className="circle-content">
                            <p className="circle-number">{countdown.hours}</p>
                            <p className="circle-label">Hours</p>
                        </div>
                    </div>
                    <div className="circle">
                        <div className="circle-content">
                            <p className="circle-number">{countdown.minutes}</p>
                            <p className="circle-label">Minutes</p>
                        </div>
                    </div>
                </div>
                <div className="progress-bar-container">
                    <ProgressBar progress={user.completedTasks.progress} onClick={handleProgressBarClick} />
                </div>
                <div className="cards-container">
                    <div className="card" onClick={() => handleCardClick("/emergency")}>
                        <FaExclamationTriangle className="card-icon" />
                        <h3>Emergency Planner</h3>
                    </div>
                    <div className="card" onClick={() => handleCardClick("/chat")}>
                        <FaComments className="card-icon" />
                        <h3>Chat</h3>
                    </div>
                    <div className="card" onClick={() => handleCardClick("/settings")}>
                        <FaCogs className="card-icon" />
                        <h3>Settings</h3>
                    </div>
                    <div className="card" onClick={() => handleCardClick("/profile")}>
                        <FaUserCircle className="card-icon" />
                        <h3>Personal Area</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
