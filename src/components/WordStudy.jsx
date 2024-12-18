import React from 'react';
import Search from './Search';
import Footer from './Footer'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

import './WordStudy.css';
import './Home.css';


const WordStudy = () => {
    const location = useLocation();
    const {
        verses = [],
        selectedBookName = '',
        selectedChapterNumber = null,
        selectedVerseNumber = null,
    } = location.state || {};

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
                    <Search
                        searchVerses={verses}
                        selectedBookName={selectedBookName}
                        selectedChapterNumber={selectedChapterNumber}
                        selectedVerseNumber={selectedVerseNumber}
                    />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default WordStudy;
