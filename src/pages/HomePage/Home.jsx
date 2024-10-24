
import React, { useEffect, useState } from 'react';
import SearchSection from '../../components/SearchSection.jsx';
import VerseOfTheDay from '../../components/VerseOfTheDay';
import MobileAppSection from '../../components/MobileAppSection';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeaturedPosts from '../../components/FeaturedPosts';
import Sidebar from '../../components/Sidebar';
import useBibleData from '../../hooks/useBibleData.jsx';
import { useNavigate } from 'react-router-dom';

import '../HomePage/Home.css';



const Home = () => {
    const [currentVerse, setCurrentVerse] = useState(null);
    const [randomVerse, setRandomVerse] = useState(null);

    const {
        bibleBooks,
        selectedBookName,
        setSelectedBookName,
        selectedChapterNumber,
        setSelectedChapterNumber,
        selectedVerse,
        setSelectedVerse,
        verses,
        setVerses
    } = useBibleData();

    const navigate = useNavigate();

    useEffect(() => {
        if (verses && verses.length) {
            navigate('/bible', {
                state: {
                    verses: verses,
                    selectedBookName: selectedBookName,
                    selectedChapterNumber: selectedChapterNumber,
                    selectedVerseNumber: selectedVerse
                }
            });
        }
    }, [verses, navigate])

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
                        setSelectedVerse={setSelectedVerse}
                        setVerses={setVerses}
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