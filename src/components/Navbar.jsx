import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/logo.png';
import menu from '../assets/images/menu.png';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/bible', label: 'Bible' },
        { path: '/koinonia-messages', label: 'Koinonia Messages' },
        { path: '/prayers', label: 'Prayers' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`} aria-expanded={isMenuOpen}>
                <ul>
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <Link to={link.path} onClick={toggleMenu}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <img src={menu} alt="Menu" />
            </div>
        </nav>
    );
};

export default Navbar;
