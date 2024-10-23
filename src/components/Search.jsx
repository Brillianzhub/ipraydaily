import React, { useState, useEffect } from 'react';
import goback from '../assets/images/go-back.png';
import goforward from '../assets/images/go-forward.png';
import useBibleData from '../hooks/useBibleData';

import './Search.css';

const Search = () => {
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [verses, setVerses] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [selectedVerseId, setSelectedVerseId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showFullChapter, setShowFullChapter] = useState(false);
    const [selectedVersion, setSelectedVersion] = useState('KJV');

    const [chapter, setChapter] = useState([]);
    const [bibleText, setBibleText] = useState('');
    const [currentVerse, setCurrentVerse] = useState(null);

    const {
        bibleBooks,
        selectedBookName,
        setSelectedBookName,
        selectedChapterNumber,
        setSelectedChapterNumber,
        // selectedVerse,
        setSelectedVerse
    } = useBibleData();


    useEffect(() => {
        if (books.length > 0) {
            const initialBook = books[0].id;
            setSelectedBook(initialBook)
        }
    }, [books])

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('https://www.brillianzhub.com/ipray/bible_books/');
            const data = await response.json();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        if (selectedBook) {
            const fetchChapters = async () => {
                const response = await fetch(`https://www.brillianzhub.com/ipray/bible_chapters/?book_id=${selectedBook}`);
                const data = await response.json();
                setChapters(data);

                if (data.length > 0) {
                    setSelectedChapter(data[0].id);
                }
            };
            fetchChapters();
        }
    }, [selectedBook]);


    useEffect(() => {
        if (selectedChapter) {
            const fetchVerses = async () => {
                const response = await fetch(`https://www.brillianzhub.com/ipray/bible_verses_kjv/?chapter_id=${selectedChapter}`);
                const data = await response.json();
                setVerses(data);
            };
            fetchVerses();
        }
    }, [selectedChapter]);

    useEffect(() => {
        if (selectedChapter) {
            const fetchVerses = async () => {
                let apiUrl = '';
                if (selectedVersion === 'KJV') {
                    apiUrl = `https://www.brillianzhub.com/ipray/bible_verses_kjv/?chapter_id=${selectedChapter}`;
                } else if (selectedVersion === 'AMP') {
                    apiUrl = `https://www.brillianzhub.com/ipray/bible_verses_amp/?chapter_id=${selectedChapter}`;
                } else if (selectedVersion === 'NIV') {
                    apiUrl = `https://www.brillianzhub.com/ipray/bible_verses_niv/?chapter_id=${selectedChapter}`;
                } else if (selectedVersion === 'ASV') {
                    apiUrl = `https://www.brillianzhub.com/ipray/bible_verses_asv/?chapter_id=${selectedChapter}`;
                }

                const response = await fetch(apiUrl);
                const data = await response.json();
                setVerses(data);

                if (data.length > 0) {
                    const foundVerse = data.find(verse => verse.id === parseInt(selectedVerseId));
                    if (foundVerse) {
                        setSelectedVerseId(foundVerse.id);
                    } else {
                        setSelectedVerseId(data[0].id);
                    }
                }
            };
            fetchVerses();
        }
    }, [selectedChapter, selectedVersion, selectedVerseId]);

    const selectedVerse = verses.find(verse => verse.id === parseInt(selectedVerseId));

    useEffect(() => {
        if (selectedVerse) {
            setCurrentVerse(selectedVerse);
        }
    }, [selectedVerse]);


    useEffect(() => {
        if (chapters && selectedChapter) {
            setChapter(chapters.find(c => c.id === parseInt(selectedChapter)));
        }
    }, [chapters, selectedChapter])


    const handleNextChapter = () => {
        if (chapter) {
            if (chapter.next_chapter) {
                setSelectedChapter(chapter.next_chapter.id)
            }
        }
    }

    console.log(JSON.stringify(verses))

    const handlePreviousChapter = () => {
        if (chapters) {
            if (chapter.previous_chapter) {
                setSelectedChapter(chapter.previous_chapter.id)
            }
        }
    }

    const handleNextVerse = () => {
        if (currentVerse && currentVerse.next_verse) {
            setSelectedVerseId(currentVerse.next_verse.id);

            const a = verses[verses.length - 1].id
            const b = currentVerse.next_verse.id;
            if (b > a) {
                setSelectedChapter(selectedChapter + 1)
            }
        }
    };

    const handlePreviousVerse = () => {
        if (currentVerse && currentVerse.previous_verse) {
            setSelectedVerseId(currentVerse.previous_verse.id);

            const a = verses[0].id
            const b = currentVerse.previous_verse.id;

            if (b < a) {
                setSelectedChapter(selectedChapter - 1);
                setSelectedVerseId(b);
            }
        }
    };


    const handleSearch = () => {
        if (searchTerm) {
            const [bookName, chapterAndVerses] = searchTerm.split(" ");
            const [chapterNumber, verseRange] = chapterAndVerses.split(":");

            let startVerse, endVerse;
            if (verseRange.includes("-")) {
                const [start, end] = verseRange.split("-");
                startVerse = parseInt(start);
                endVerse = parseInt(end);
            } else {
                startVerse = parseInt(verseRange);
                endVerse = startVerse;
            }

            const foundBook = bibleBooks.find(book => book.name.toLowerCase() === bookName.toLowerCase());


            if (foundBook) {
                setSelectedBookName(foundBook.name)

                fetch(`https://www.brillianzhub.com/ipray/bible_chapters/?book_id=${foundBook.id}`)
                    .then(response => response.json())
                    .then(chapterData => {
                        const foundChapter = chapterData.find(chapter => chapter.number === parseInt(chapterNumber));


                        if (foundChapter) {
                            setSelectedChapterNumber(foundChapter.number)
                            fetch(`https://www.brillianzhub.com/ipray/bible_verses_kjv/?chapter_id=${foundChapter.id}`)
                                .then(response => response.json())
                                .then(verseData => {
                                    const foundVerses = verseData.filter(verse =>
                                        verse.verse >= startVerse && verse.verse <= endVerse
                                    );

                                    if (foundVerses.length > 0) {
                                        setVerses(foundVerses);
                                        setSelectedVerse(foundVerses);
                                    } else {
                                        console.error("Verses not found");
                                    }
                                })
                                .catch(error => console.error("Error fetching verses:", error));
                        } else {
                            console.error("Chapter not found");
                        }
                    })
                    .catch(error => console.error("Error fetching chapters:", error));
            } else {
                console.error("Book not found");
            }
        }
    };

    const handleShowFullChapter = () => {
        setShowFullChapter(true);
    };

    const handleHideFullChapter = () => {
        setShowFullChapter(false);
    };

    const bookName = selectedBook && books.length > 0
        ? books.find(book => book.id === parseInt(selectedBook))?.name || 'Book'
        : 'Book';

    const chapterNumber = selectedChapter && chapters.length > 0
        ? chapters.find(chapter => chapter.id === parseInt(selectedChapter))?.number || '0'
        : '0';
    const verseNumber = currentVerse?.verse || '0';

    const pageTitle = showFullChapter
        ? `${bookName} ${chapterNumber}`
        : `${bookName} ${chapterNumber} : ${verseNumber}`;


    return (
        <div className="search-container">
            <div className="search-dropdowns">
                <select
                    className="dropdown"
                    onChange={(e) => setSelectedBook(e.target.value)}
                    value={selectedBook}
                >
                    <option value="" disabled>Select Bible Book</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>{book.name}</option>
                    ))}
                </select>

                <select
                    className="dropdown"
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    value={selectedChapter}
                    disabled={!selectedBook}
                >
                    <option value="" disabled>Select Chapter</option>
                    {chapters.map((chapter) => (
                        <option key={chapter.id} value={chapter.id}>{chapter.number}</option>
                    ))}
                </select>

                <select
                    className="dropdown"
                    onChange={(e) => setSelectedVerseId(e.target.value)}
                    value={selectedVerseId}
                    disabled={!selectedChapter}
                >
                    <option value="" disabled>Select Verse</option>
                    {verses.map((verse) => (
                        <option key={verse.id} value={verse.id}>{verse.verse}</option>
                    ))}
                </select>
            </div>

            <div className="search-row">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by Bible verse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>

            <div className="bible-content">
                <div className="header-row">
                    <div className='header-title'>
                        {showFullChapter ? (
                            <button
                                className="nav-button left"
                                onClick={handlePreviousChapter}
                            >
                                <img src={goback} alt='Go Back' />
                            </button>
                        ) : (
                            <button
                                className="nav-button left"
                                onClick={handlePreviousVerse}
                            >
                                <img src={goback} alt='Go Back' />
                            </button>
                        )}
                        <h2>{pageTitle}</h2>
                        {showFullChapter ? (
                            <button
                                className="nav-button left"
                                onClick={handleNextChapter}
                            >
                                <img src={goforward} alt='Go Back' />
                            </button>
                        ) : (
                            <button
                                className="nav-button left"
                                onClick={handleNextVerse}
                            >
                                <img src={goforward} alt='Go Back' />
                            </button>
                        )}
                    </div>
                    <div className="version-selector">
                        <select
                            className="dropdown"
                            onChange={(e) => setSelectedVersion(e.target.value)}
                            value={selectedVersion}
                        >
                            <option value="KJV">King James Version (KJV)</option>
                            <option value="AMP">Amplified Version (AMP)</option>
                            <option value="NIV">New International Version (NIV)</option>
                            <option value="ASV">American Standard Version (ASV)</option>
                        </select>
                    </div>
                </div>
                {showFullChapter ? (
                    <div className="full-chapter">
                        {verses.map(verse => (
                            <p key={verse.id}><strong>{verse.verse}</strong> {verse.text}</p>
                        ))}
                        <button onClick={handleHideFullChapter}>Hide Full Chapter</button>
                    </div>
                ) : (
                    currentVerse && (
                        <div className="current-verse">
                            <p><strong>{currentVerse.verse}</strong> {currentVerse.text}</p>

                            <button onClick={handleShowFullChapter}>Full Chapter</button>
                        </div>
                    )
                )}
            </div>

        </div>
    );
};

export default Search;
