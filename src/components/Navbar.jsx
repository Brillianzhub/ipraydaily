"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

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
        <nav className={styles.navbar}>
            <div className={styles.navbarLogo}>
                <Link href="/">
                    <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
                </Link>
            </div>
            <div className={`${styles.navbarLinks} ${isMenuOpen ? styles.navbarLinksActive : ''}`} aria-expanded={isMenuOpen}>
                <ul>
                    {navLinks.map(link => (
                        <li key={link.path}>
                            <Link href={link.path} onClick={toggleMenu}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.navbarToggle} onClick={toggleMenu}>
                <Image src="/images/menu.png" alt="Menu" width={48} height={48} />
            </div>
        </nav>
    );
};

export default Navbar;
