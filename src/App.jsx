import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Prayer from '../src/components/Prayer';
import AboutPage from '../src/components/AboutPage';
import WordStudy from '../src/components/WordStudy';
import Home from '../src/components/Home';
import Koinonia from '../src/components/Koinonia';
import KoinoniaMessageDetail from '../src/components/KoinoniaMessageDetail';

// import BlogPosts from '../src/components/BlogPosts';


import './Home.css';
import BlogPosts from './components/BlogPosts';


const App = () => {
  const [bibleBooks, setBibleBooks] = useState([]);
  const [verses, setVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState([]);
  const [selectedBookName, setSelectedBookName] = useState("");
  const [selectedChapterNumber, setSelectedChapterNumber] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(null);
  const [randomVerse, setRandomVerse] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/bible" element={
          <WordStudy
            bibleBooks={bibleBooks}
            setSelectedBookName={setSelectedBookName}
            setSelectedChapterNumber={setSelectedChapterNumber}
            setVerses={setVerses}
            setSelectedVerse={setSelectedVerse}
            setCurrentVerse={setCurrentVerse}
            randomVerse={randomVerse}
            selectedVerse={selectedVerse}
          />}
        />
        <Route path="/prayers" element={<Prayer />} />
        <Route path="/koinonia-messages" element={<Koinonia />} />
        <Route path="/koinonia-messages/:slug" element={<KoinoniaMessageDetail />} />
      </Routes>
    </Router>
  );
};

export default App;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Import axios for making API requests
// import Navbar from '../src/components/Navbar';
// import Banner from '../src/components/Banner';
// import SearchSection from '../src/components/SearchSection';
// import VerseOfTheDay from '../src/components/VerseOfTheDay';
// import MobileAppSection from '../src/components/MobileAppSection';
// import BlogPosts from '../src/components/BlogPosts';
// import Footer from '../src/components/Footer';

// import './App.css';

// const App = () => {
//   const [bibleBooks, setBibleBooks] = useState([]);
//   const [verses, setVerses] = useState([]);
//   const [selectedVerse, setSelectedVerse] = useState([]);
//   const [selectedBookName, setSelectedBookName] = useState("");
//   const [selectedChapterNumber, setSelectedChapterNumber] = useState(null);
//   const [currentVerse, setCurrentVerse] = useState(null);
//   const [randomVerse, setRandomVerse] = useState(null);


//   const categories = ['Salvation', 'Courage', 'Deliverance', 'Blessing', 'Advancement', 'Dominion'];

//   const fetchBibleBooks = async () => {
//     try {
//       const response = await axios.get('https://www.brillianzhub.com/ipray/bible_books/');
//       setBibleBooks(response.data);
//     } catch (error) {
//       console.error("Error fetching Bible books:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBibleBooks();
//   }, []);

//   console.log(`Current verse ${JSON.stringify(currentVerse)}`)
//   return (
//     <>
//       <Navbar />
//       <Banner />
//       <SearchSection
//         bibleBooks={bibleBooks}
//         setSelectedBookName={setSelectedBookName}
//         setSelectedChapterNumber={setSelectedChapterNumber}
//         setVerses={setVerses}
//         setSelectedVerse={setSelectedVerse}
//         setCurrentVerse={setCurrentVerse}
//         randomVerse={randomVerse}
//         selectedVerse={selectedVerse}
//       />
//       <VerseOfTheDay
//         selectedBookName={selectedBookName}
//         selectedVerse={selectedVerse}
//         setSelectedVerse={setSelectedVerse}
//         selectedChapterNumber={selectedChapterNumber}
//         bibleBooks={bibleBooks}
//         randomVerse={randomVerse}
//         setRandomVerse={setRandomVerse}
//       />
//       <MobileAppSection />
//       <BlogPosts />
//       <Footer />
//     </>
//   );
// };

// export default App;
