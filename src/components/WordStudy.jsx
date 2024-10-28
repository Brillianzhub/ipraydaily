import React from 'react';
import SearchSection from './SearchSection';
import Footer from './Footer'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SearchResults from './SearchResults';

import './WordStudy.css';
import './Home.css';


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
