import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/logo.png';
import menu from '../assets/images/menu.png'; // The menu icon image

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li>
                        <Link to="/" onClick={toggleMenu}>Home</Link>
                    </li>
                    <li>
                        <Link to="/bible" onClick={toggleMenu}>Bible</Link>
                    </li>
                    <li>
                        <Link to="/koinonia-messages" onClick={toggleMenu}>Koinonia Messages</Link>
                    </li>
                    <li>
                        <Link to="/prayers" onClick={toggleMenu}>Prayers</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <img src={menu} alt="Menu" />
            </div>
        </nav>
    );
};

export default Navbar;
