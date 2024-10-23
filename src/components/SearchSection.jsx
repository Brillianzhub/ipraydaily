import React, { useEffect, useState } from 'react';
import './SearchSection.css';

const SearchSection = ({
    bibleBooks,
    setCurrentVerse,
    setSelectedVerse,
    setVerses,
    setSelectedBookName,
    setSelectedChapterNumber,
    randomVerse,
    selectedVerse
}) => {
    const prayerCategories = ["Healing", "Thanksgiving", "Salvation"];
    const [chapters, setChapters] = useState([]);
    const [selectedChapterId, setSelectedChapterId] = useState('');
    const [verses, setVersesLocal] = useState([]);
    const [selectedVerseId, setSelectedVerseId] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBook, setSelectedBook] = useState('');


    useEffect(() => {
        if (selectedBook) {
            fetch(`https://www.brillianzhub.com/ipray/bible_chapters/?book_id=${selectedBook}`)
                .then(response => response.json())
                .then(data => {
                    setChapters(data);
                    setSelectedChapterId('');
                    setSelectedVerseId('');
                    setVersesLocal([]);
                    setVerses([]);
                })
                .catch(error => console.error("Error fetching chapters:", error));
        }
    }, [selectedBook, setVerses]);

    useEffect(() => {
        if (selectedChapterId) {
            fetch(`https://www.brillianzhub.com/ipray/bible_verses_kjv/?chapter_id=${selectedChapterId}`)
                .then(response => response.json())
                .then(data => {
                    setVersesLocal(data);
                    setSelectedVerseId('');
                    setVerses(data);
                })
                .catch(error => console.error("Error fetching verses:", error));
        }
    }, [selectedChapterId, setVerses]);

    useEffect(() => {
        if (selectedVerseId && verses.length > 0) {
            const verse = verses.find(verse => verse.id === parseInt(selectedVerseId));
            setSelectedVerse(verse);
        }
    }, [selectedVerseId, verses, setSelectedVerse]);

    useEffect(() => {
        if (selectedVerseId || selectedVerse) {
            setCurrentVerse(selectedVerse);
        } else if (randomVerse) {
            setCurrentVerse(randomVerse);
        }
    }, [selectedVerseId, verses, randomVerse, selectedVerse]);


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


    return (
        <div className="search-div">
            <div className="search-row">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by Bible verse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="dropdown-row">
                    <select className="dropdown">
                        <option value="" disabled>Select Prayer Category</option>
                        {prayerCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <button className="search-btn" onClick={handleSearch}>Search</button>
            </div>


        </div>
    );
}

export default SearchSection;
