import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Prayer from '../src/components/Prayer';
import AboutPage from '../src/components/AboutPage';
import WordStudy from '../src/components/WordStudy';
import Home from '../src/components/Home';
import Koinonia from '../src/components/Koinonia';
import KoinoniaMessageDetail from '../src/components/KoinoniaMessageDetail';
import './Home.css';
import PrivacyPolicy from './components/PrivacyPolicy';
import useBibleData from '../src/hooks/useBibleData.jsx';
import NotFound from '../src/pages/NotFound/NotFound.jsx'


const App = () => {
  const [currentVerse, setCurrentVerse] = useState(null);
  const [randomVerse, setRandomVerse] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/bible" element={<WordStudy />} />
      <Route path="/prayers" element={<Prayer />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/koinonia-messages" element={<Koinonia />} />
      <Route path="/koinonia-messages/:slug" element={<KoinoniaMessageDetail />} />
    </Routes>
  );
};

export default App;
