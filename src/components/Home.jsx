
import React, { useEffect, useState } from 'react';
import SearchSection from './SearchSection';
import VerseOfTheDay from './VerseOfTheDay';
import PrayerOfTheDay from './PrayerOfTheDay';

import MobileAppSection from './MobileAppSection';
import Navbar from './Navbar';
import Footer from './Footer';
import FeaturedPosts from './FeaturedPosts';
import Sidebar from './Sidebar';
import useBibleData from '../hooks/useBibleData.jsx';
import { useNavigate } from 'react-router-dom';

import './Home.css';


const Home = () => {
    const [currentVerse, setCurrentVerse] = useState(null);
    const [randomVerse, setRandomVerse] = useState(null);
    const [showVerse, setShowVerse] = useState(true);
    const [prayer, setPrayer] = useState([]);
    const [currentPrayer, setCurrentPrayer] = useState(null);

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
        const fetchPrayer = async () => {
            try {
                const response = await fetch(`https://www.brillianzhub.com/ipray/prayerpoints`);
                const data = await response.json()
                setPrayer(data);
                setCurrentPrayer(data[Math.floor(Math.random() * data.length)]);
            } catch (error) {
                console.log("Unable to fetch data", error)
            }
        };
        fetchPrayer();
    }, [])

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowVerse(prev => !prev);
        }, 120000);

        return () => clearInterval(intervalId);
    }, []);

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
                <div className="content-container">
                    <div className="main-section">
                        <SearchSection
                            bibleBooks={bibleBooks}
                            setSelectedBookName={setSelectedBookName}
                            setSelectedChapterNumber={setSelectedChapterNumber}
                            setSelectedVerse={setSelectedVerse}
                            setVerses={setVerses}
                        />
                        <div className="animated-section">
                            {showVerse ? (
                                <VerseOfTheDay
                                    bibleBooks={bibleBooks}
                                    randomVerse={randomVerse}
                                    setRandomVerse={setRandomVerse}
                                />
                            ) : (
                                <PrayerOfTheDay
                                    prayer={prayer}
                                    currentPrayer={currentPrayer}
                                    setCurrentPrayer={setCurrentPrayer}
                                />
                            )}
                        </div>
                        <FeaturedPosts />
                        <MobileAppSection />
                    </div>
                    <Sidebar />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;