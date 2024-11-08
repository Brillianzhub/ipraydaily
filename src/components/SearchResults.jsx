import React, { useState, useEffect } from 'react';
import './Search.css';
import { useBibleData } from '../context/BibleDataContext';
import Image from 'next/image';
import axios from 'axios';


const SearchResults = () => {
    const [showFullChapter, setShowFullChapter] = useState(false);
    const [selectedResults, setSelectedResults] = useState([]);
    const [bookName, setBookName] = useState('');
    const [bookChapter, setBookChapter] = useState('');
    const [bookVerse, setBookVerse] = useState('');

    const [nextBookName, setNextBookName] = useState('');
    const [nextBookChapter, setNextBookChapter] = useState('');
    const [bookChapterId, setBookChapterId] = useState('');


    const {
        searchTerm,
        results,
        showNextChapter,
        setShowNextChapter,
        nextChapter,
        selectedVersion,
        setNextChapter,
    } = useBibleData();

    useEffect(() => {
        const parseVerseRange = (searchTerm) => {
            const rangeMatch = searchTerm.match(/:(\d+)(?:-(\d+))?$/);

            if (rangeMatch) {
                const startVerse = parseInt(rangeMatch[1], 10);
                const endVerse = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : startVerse;
                return { startVerse, endVerse };
            }
            return null;
        };

        const range = parseVerseRange(searchTerm);

        if (range) {
            const verses = results.filter(verse =>
                verse.verse >= range.startVerse && verse.verse <= range.endVerse
            );
            setSelectedResults(verses);
        } else {
            setSelectedResults(results);
        }
    }, [searchTerm, results]);


    useEffect(() => {
        if (results && results.length > 0 && searchTerm) {
            const titleName = results[0].book;
            const titleChapter = results[0].chapter.number;
            const titleVerse = results[0].verse;
            const titleChapterId = results[0].chapter.id

            setBookName(titleName);
            setBookChapter(titleChapter);
            setBookChapterId(titleChapterId)

            const verseTerm = searchTerm.split(':')[1]

            if (verseTerm) {
                setBookVerse(verseTerm)
            } else {
                setBookVerse(titleVerse)
            }
        }

    }, [results, searchTerm])
    const fetchVerseByChapterId = async (chapter_id) => {
        let uri;

        if (selectedVersion === "AMP") {
            uri = "bible_verses_amp";
        } else if (selectedVersion === "NIV") {
            uri = "bible_verses_niv";
        } else if (selectedVersion === "ASV") {
            uri = "bible_verses_asv";
        } else {
            uri = "bible_verses_kjv";
        }

        try {
            const response = await axios.get(`https://www.brillianzhub.com/ipray/${uri}/?chapter_id=${chapter_id}`);

            if (response.data && response.data.results && response.data.results.length > 0) {
                setNextChapter(response.data.results);
            } else {
                console.log("No results found for the next chapter.");
            }
        } catch (error) {
            console.error("Error fetching data for next chapter:", error);
        }
    };


    const handleNextChapter = () => {
        if (bookChapterId < 1189) {
            const nextChapterId = bookChapterId + 1;

            fetchVerseByChapterId(nextChapterId);
            setShowNextChapter(true);

        } else {
            console.log("Next chapter not available.");
        }
    };


    const handlePreviousChapters = () => {
        if (bookChapterId > 1) {
            const previousChapter = bookChapterId - 1;
            fetchVerseByChapterId(previousChapter);
            setShowNextChapter(true);
        } else {
            console.log("No previous chapter found.")
        }
    }

    useEffect(() => {
        if (nextChapter && nextChapter.length > 0) {
            setBookChapterId(nextChapter[0].chapter);

            setNextBookName(nextChapter[0].next_verse.book)
            setNextBookChapter(nextChapter[0].next_verse.chapter)

        }
    }, [nextChapter])


    const handleShowFullChapter = () => {
        setShowFullChapter(true);
    };

    const handleHideFullChapter = () => {
        setShowFullChapter(false);
    }

    const titleHeader = showNextChapter ? `${nextBookName} ${nextBookChapter}` : `${bookName} ${bookChapter}:${bookVerse}`


    return (
        <div className="search-container">
            <div className="bible-content">
                <div className="header-row">
                    <div className='header-title'>

                        <button
                            className="nav-button left"
                            onClick={handlePreviousChapters}
                        >
                            <Image
                                src="/images/go-back.png"
                                alt='Go Back'
                                width={48}
                                height={48}
                            />
                        </button>

                        <h2>{titleHeader}</h2>

                        <button
                            className="nav-button left"
                            onClick={handleNextChapter}
                        >
                            <Image
                                src="/images/go-forward.png"
                                alt="Go Back"
                                width={48}
                                height={48}
                            />
                        </button>

                    </div>
                </div>

                <div className="full-chapter">

                    {nextChapter && nextChapter.length > 0 && showNextChapter ? (
                        <div className="full-chapter">
                            {nextChapter.map(verse => (
                                <p key={verse.id}><strong>{verse.verse}</strong> {verse.text}</p>
                            ))}
                            <button onClick={handleHideFullChapter}>Hide Full Chapter</button>
                        </div>
                    ) : showFullChapter && results && results.length > 0 ? (
                        <div className="full-chapter">
                            {results.map(verse => (
                                <p key={verse.id}><strong>{verse.verse}</strong> {verse.text}</p>
                            ))}
                            <button onClick={handleHideFullChapter}>Hide Full Chapter</button>
                        </div>
                    ) : (
                        <div className="full-chapter">
                            {selectedResults.map(verse => (
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
