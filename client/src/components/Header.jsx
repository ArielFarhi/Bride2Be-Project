import React from "react";
import HamburgerMenu from "./Navbar";

function Header() {
    return (
        <header className="header">
            <HamburgerMenu />
            <h1 className="header-title">Omer & Gal</h1>
            <div className="header-image"></div>
        </header>
    );
}

export default Header;
