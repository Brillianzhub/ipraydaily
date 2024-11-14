"use client";
import React from "react";
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import BannerSection from '../../components/BannerSection';
import Sidebar from '../../components/Sidebar';
import PlanList from '../../components/PlanList';

import '../../components/Home.css';


const BibleStudy = () => {
    return (
        <div className="home-container">
            <Navbar />
            <BannerSection />
            <div className="content-container">
                <div className="main-section">
                    <PlanList />
                </div>
                <Sidebar />

            </div>
            <Footer />
        </div>
    );
}

export default BibleStudy;