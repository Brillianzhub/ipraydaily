
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import About from './About';
import Sidebar from './Sidebar';

import './Home.css';


const AboutPage = () => {

    return (
        <div className="home-container">
            <Navbar />
            <div className="banner-section">
                <h1>
                    ...Men ought always to pray, and not to faint.&nbsp;
                    <span>Luke 18:1 (KJV)</span>
                </h1>
            </div>
            <div className="content-container">
                <div className="main-section">
                    <About />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;
