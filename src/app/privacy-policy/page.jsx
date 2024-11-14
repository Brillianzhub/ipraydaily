import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Policy from '../../components/Policy';
import Sidebar from '../../components/Sidebar';
import '../../components/Home.css';
import BannerSection from '../../components/BannerSection';


const PrivacyPolicy = () => {


    return (
        <div className="home-container">
            <Navbar />
            <BannerSection />
            <div className="content-container">
                <div className="main-section">
                    <Policy />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
