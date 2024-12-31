import React, { useState } from "react";
import { Link } from "react-router-dom";

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate(); // deleted because it is not used

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {!isOpen && (<button className="menu-button" onClick={toggleMenu}>☰</button>)}
            <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
                <button className="close-button" onClick={toggleMenu}>✖</button>
                <nav className="menu-nav">
                    <ul className="top-links">
                        <li><Link to="/HomePage">🏠 HomePage</Link></li>
                        <li><Link to="#">👤 Personal Area</Link></li>
                        <li><Link to="#">📋 Task Management</Link></li>
                        <li><Link to="#">📦 Vendors</Link></li>
                        <li><Link to="/checklist">✔️ Check List</Link></li>
                        <li><Link to="/emergency">📞 Emergency Planner</Link></li>
                    </ul>
                    <ul className="bottom-links">
                        {/* <li><button onClick={handleLogout}>🚪 Log-out</button></li> */}
                        <li><Link to="/settings">⚙️ Setting</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HamburgerMenu;
