import React from 'react';
import Search from './Search';
import MobileAppSection from './MobileAppSection';
import Footer from './Footer'

import './WordStudy.css';
import './Home.css';

import Navbar from './Navbar';


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
                    {/* <MobileAppSection /> */}
                </div>
                <div className="sidebar-section">
                    <h2>Sidebar</h2>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
    // return (
    //     <div className="word-study-container">
    //         <Search />
    //     </div>
    // );
};

export default WordStudy;
