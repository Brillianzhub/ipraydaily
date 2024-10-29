"use client";

import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SearchSection from '../../components/SearchSection';
import SearchResults from '../../components/SearchResults';

import Sidebar from '../../components/Sidebar';
import '../../components/WordStudy.css';
import '../../components/Home.css';


const WordStudy = () => {

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