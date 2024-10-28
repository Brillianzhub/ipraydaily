import React, { useState, useEffect } from 'react';
import goback from '../assets/images/go-back.png';
import goforward from '../assets/images/go-forward.png';

import './Search.css';
import { useBibleData } from '../context/BibleDataContext';

const SearchResults = () => {
    const [showFullChapter, setShowFullChapter] = useState(false);

    const {
        verses,
        selectedBookName,
        selectedChapterNumber,
        selectedVerse,
        setSelectedChapterId,
        setSelectedBookId,
        selectedChapterId,
        setSearchTerm,
        searchTerm,
        handleSearchClick,
        setSelectedChapterNumber,
        bibleBooks,
        chapters,
        currentChapter,
        setCurrentChapter
    } = useBibleData();


    const handleNextChapter = () => {
        if (currentChapter && currentChapter.next_chapter) {
            const book = currentChapter.book.name;
            const chapter = currentChapter.next_chapter.number;
            const newSearchTerm = `${book} ${chapter}`;

            setSearchTerm(newSearchTerm);
            handleSearchClick(newSearchTerm);
            setShowFullChapter(true);
        } else {
            console.log("Next chapter not available.");
        }
    };


    const handlePreviousChapter = () => {
        if (currentChapter && currentChapter.previous_chapter) {
            const book = currentChapter.book.name;
            const chapter = currentChapter.previous_chapter.number;
            const newSearchTerm = `${book} ${chapter}`;

            setSearchTerm(newSearchTerm);
            handleSearchClick(newSearchTerm);
            setShowFullChapter(true);
        } else {
            console.log("Next chapter not available.");
        }
    };

    useEffect(() => {
        if (selectedBookName && bibleBooks.length > 0) {
            const currentBook = bibleBooks.find(book => book.name.toLowerCase() === selectedBookName.toLowerCase());
            setSelectedBookId(parseInt(currentBook.id))
        }
    }, [bibleBooks, selectedBookName])

    useEffect(() => {
        if (selectedBookName && selectedVerse.length > 0) {
            setSelectedChapterId(selectedVerse[0].id);
        }
    }, [selectedBookName, selectedVerse])

    const handleShowFullChapter = () => {
        setShowFullChapter(true);
    };

    const handleHideFullChapter = () => {
        setShowFullChapter(false);
    }


    // const pageTitle = selectedBookName && selectedChapterNumber ? `${selectedBookName} ${selectedChapterNumber}` : null;


    return (
        <div className="search-container">
            <div className="bible-content">
                <div className="header-row">
                    <div className='header-title'>

                        <button
                            className="nav-button left"
                            onClick={handlePreviousChapter}
                        >
                            <img src={goback} alt='Go Back' />
                        </button>

                        <h2>{searchTerm}</h2>

                        <button
                            className="nav-button left"
                            onClick={handleNextChapter}
                        >
                            <img src={goforward} alt='Go Back' />
                        </button>

                    </div>
                </div>

                <div className="full-chapter">
                    {showFullChapter ? (
                        <div className="full-chapter">
                            {selectedVerse.map(verse => (
                                <p key={verse.id}><strong>{verse.verse}</strong> {verse.text}</p>
                            ))}
                            <button onClick={handleHideFullChapter}>Hide Full Chapter</button>
                        </div>
                    ) : (
                        <div className="full-chapter">
                            {verses.map(verse => (
                                <p key={verse.id}><strong>{verse.verse}</strong> {verse.text}</p>
                            ))}
                            <button onClick={handleShowFullChapter}>Hide Full Chapter</button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default SearchResults;
