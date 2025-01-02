import React from "react";
import HamburgerMenu from "./Navbar";
import { useNavigate } from "react-router-dom";


function Header({ user }) {
    console.log(user);
    const navigate = useNavigate();

    function goToHome() {
        navigate("/home");
    }

    return (
        <header className="header">
            <HamburgerMenu />
            <h1 className="header-title">{user.username}</h1>
            <div className="header-image" onClick={goToHome}></div>
        </header>
    );
}

export default Header;
