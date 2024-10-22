import React from 'react';
import Search from './Search';
import MobileAppSection from './MobileAppSection';
import Footer from './Footer'

import './WordStudy.css';
import './Home.css';

import Navbar from './Navbar';
import Sidebar from './Sidebar';


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
                    <Search />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default WordStudy;
