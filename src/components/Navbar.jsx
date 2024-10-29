"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import './Navbar.css';

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
                <Link href="/">
                    <img src="/images/logo.png" alt="Logo" />
                </Link>
            </div>
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`} aria-expanded={isMenuOpen}>
                <ul>
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <Link href={link.path} onClick={toggleMenu}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <img src="/images/menu.png" alt="Menu" />
            </div>
        </nav>
    );
};

export default Navbar;
