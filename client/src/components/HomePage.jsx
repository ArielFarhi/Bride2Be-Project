import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
// import "./HomePage.css";

function HomePage() {
    const [weddingCountdown, setWeddingCountdown] = useState("");

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && userData.wedding_date) {
            const weddingDate = new Date(userData.wedding_date);
            const calculateCountdown = () => {
                const now = new Date();
                const timeDiff = weddingDate - now;
                if (timeDiff > 0) {
                    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    setWeddingCountdown(`${days} days until the wedding! 🎉`);
                } else {
                    setWeddingCountdown("The wedding date has passed!");
                }
            };
            calculateCountdown();
            const timer = setInterval(calculateCountdown, 1000); // עדכון ספירה כל שנייה
            return () => clearInterval(timer);
        }
    }, []);

    return (
        <div className="home-page">
            <Header />
            <Navbar />
            <div className="home-content">
                <img
                    src="./images/Bride&Groom.webp"
                    alt="Couple"
                    className="couple-image"
                />
                <div className="countdown">{weddingCountdown}</div>
            </div>
        </div>
    );
}

export default HomePage;
