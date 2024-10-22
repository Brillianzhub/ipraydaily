
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrayerPage from './PrayerPage';
import Navbar from './Navbar';
import Footer from './Footer'

import './Home.css';
import Sidebar from './Sidebar';



const Prayer = () => {
    const [bibleBooks, setBibleBooks] = useState([]);
    const [verses, setVerses] = useState([]);
    const [selectedVerse, setSelectedVerse] = useState([]);
    const [selectedBookName, setSelectedBookName] = useState("");
    const [selectedChapterNumber, setSelectedChapterNumber] = useState(null);
    const [currentVerse, setCurrentVerse] = useState(null);
    const [randomVerse, setRandomVerse] = useState(null);


    const categories = ['Salvation', 'Courage', 'Deliverance', 'Blessing', 'Advancement', 'Dominion'];

    const fetchBibleBooks = async () => {
        try {
            const response = await axios.get('https://www.brillianzhub.com/ipray/bible_books/');
            setBibleBooks(response.data);
        } catch (error) {
            console.error("Error fetching Bible books:", error);
        }
    };

    useEffect(() => {
        fetchBibleBooks();
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
                <div className="main-section">
                    <PrayerPage />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default Prayer;
