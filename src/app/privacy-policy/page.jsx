import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Policy from '../../components/Policy';
import Sidebar from '../../components/Sidebar';
import '../../components/Home.css';


const PrivacyPolicy = () => {


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
                    <Policy />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
