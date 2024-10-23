
import React, { useState } from 'react';
import SearchSection from './SearchSection';
import VerseOfTheDay from './VerseOfTheDay';
import MobileAppSection from './MobileAppSection';
import Navbar from './Navbar';
import Footer from './Footer';
import FeaturedPosts from './FeaturedPosts';
import Sidebar from './Sidebar';
import useBibleData from '../hooks/useBibleData.js';

import './Home.css';


const Home = () => {
    const [verses, setVerses] = useState([]);
    const [currentVerse, setCurrentVerse] = useState(null);
    const [randomVerse, setRandomVerse] = useState(null);

    const {
        bibleBooks,
        selectedBookName,
        setSelectedBookName,
        selectedChapterNumber,
        setSelectedChapterNumber,
        selectedVerse,
        setSelectedVerse
    } = useBibleData();


    const categories = ['Salvation', 'Courage', 'Deliverance', 'Blessing', 'Advancement', 'Dominion'];


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
                    <SearchSection
                        bibleBooks={bibleBooks}
                        setSelectedBookName={setSelectedBookName}
                        setSelectedChapterNumber={setSelectedChapterNumber}
                        setVerses={setVerses}
                        setSelectedVerse={setSelectedVerse}
                        setCurrentVerse={setCurrentVerse}
                        randomVerse={randomVerse}
                        selectedVerse={selectedVerse}
                    />
                    <VerseOfTheDay
                        bibleBooks={bibleBooks}
                        randomVerse={randomVerse}
                        setRandomVerse={setRandomVerse}
                    />
                    <FeaturedPosts />
                    <MobileAppSection />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
