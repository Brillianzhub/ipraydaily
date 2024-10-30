"use client";

import React, { useEffect, useState } from 'react';
import SearchSection from '../components/SearchSection';
import VerseOfTheDay from '../components/VerseOfTheDay';
import PrayerOfTheDay from '../components/PrayerOfTheDay';
import MobileAppSection from '../components/MobileAppSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturedPosts from '../components/FeaturedPosts';
import Sidebar from '../components/Sidebar';
import { useBibleData } from '../context/BibleDataContext';
import '../components/Home.css';

const Home = () => {
  const [randomVerse, setRandomVerse] = useState(null);
  const [showVerse, setShowVerse] = useState(true);
  const [prayer, setPrayer] = useState([]);
  const [currentPrayer, setCurrentPrayer] = useState(null);

  const {
    bibleBooks,
    setSelectedBookName,
    setSelectedChapterNumber,
    setSelectedVerse,
    setVerses,
    loading,
    error
  } = useBibleData();


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
    const intervalId = setInterval(() => {
      setShowVerse(prev => !prev);
    }, 120000);

    return () => clearInterval(intervalId);
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


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
      <Footer />
    </div>
  );
};

export default Home;
