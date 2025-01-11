import React from "react";
import PropTypes from "prop-types";
import HamburgerMenu from "./Navbar";
import { useNavigate } from "react-router-dom";


function Header({ user }) {
    const navigate = useNavigate();

    function goToHome() {
        navigate("/");
    }

    return (
        <header className="header">
            <HamburgerMenu />
            <h1 className="header-title">{user.partnerOneName} & {user.partnerTwoName}</h1>
            <div className="header-image" onClick={goToHome}></div>
        </header>
    );
}

Header.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Header;
