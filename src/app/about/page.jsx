import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import About from '../../components/About';
import Sidebar from '../../components/Sidebar';

import '../../components/Home.css';
import BannerSection from '@/components/BannerSection';


const AboutPage = () => {

    return (
        <div className="home-container">
            <Navbar />
            <BannerSection />
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
