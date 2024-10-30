import React from 'react';
import PrayerPage from '../../components/PrayerPage';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';


import '../../components/Home.css';


const Prayer = () => {

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
                    <PrayerPage />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default Prayer;
