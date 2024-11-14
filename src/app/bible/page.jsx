"use client";

import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SearchSection from '../../components/SearchSection';
import SearchResults from '../../components/SearchResults';

import Sidebar from '../../components/Sidebar';
import '../../components/WordStudy.css';
import '../../components/Home.css';
import BannerSection from '@/components/BannerSection';


const WordStudy = () => {

    return (
        <div className="home-container">
            <Navbar />
            <BannerSection />
            <div className="content-container">
                <div className="main-section">
                    <SearchSection />
                    <SearchResults />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default WordStudy;