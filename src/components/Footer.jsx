import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <>
            <footer className="content-container footer">
                <div className="container footer-container">
                    <div className="footer-logo">
                        <img src="../assets/logo.png" alt="Logo" />
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="/about">About</a></li>
                                <li><a href="/koinonia-messages">Koinonia Messages</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Follow Us</h4>
                            <ul>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">YouTube</a></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h4>Download App</h4>
                            <ul>
                                <li><a href="#">iOS</a></li>
                                <li><a href="#">Android</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
