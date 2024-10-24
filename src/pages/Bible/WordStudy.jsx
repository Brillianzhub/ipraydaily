import React from 'react';
import Search from '../../components/Search';
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useLocation } from 'react-router-dom';

import '../Bible/WordStudy.css';
import '../HomePage/Home.css';


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
