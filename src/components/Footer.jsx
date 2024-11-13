import React from 'react';
import Link from 'next/link';
import './Footer.css';
import Image from 'next/image';


const Footer = () => {
    return (
        <>
            <footer className="content-container footer">
                <div className="container footer-container">
                    <div className="footer-logo">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={48}
                            height={48}
                        />
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Resources</h4>
                            <ul>
                                <li><Link href="/koinonia-messages">Koinonia Messages</Link></li>
                                <li><Link href="/about">About</Link></li>
                                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Follow Us</h4>
                            <ul>
                                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                                <li><a href="https://www.youtube.com/@KoinoniaMessage/videos" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Download App</h4>
                            <ul>
                                <li><a href="#" target="_blank" rel="noopener noreferrer">iOS</a></li>
                                <li><a href="https://play.google.com/store/apps/details?id=com.brillianzhub.ipray" target="_blank" rel="noopener noreferrer">Android</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
