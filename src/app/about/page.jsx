import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import About from '../../components/About';
import Sidebar from '../../components/Sidebar';

import '../../components/Home.css';


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
