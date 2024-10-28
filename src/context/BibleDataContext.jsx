import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleSearch } from '../utils/bibleSearchUtils';



const BibleDataContext = createContext();

export const useBibleData = () => useContext(BibleDataContext);

export const BibleDataProvider = ({ children }) => {

    const [bibleBooks, setBibleBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBookName, setSelectedBookName] = useState("");
    const [selectedChapterNumber, setSelectedChapterNumber] = useState(null);
    const [selectedChapterId, setSelectedChapterId] = useState('');
    const [selectedBookId, setSelectedBookId] = useState('');
    const [selectedVerse, setSelectedVerse] = useState([]);
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentChapter, setCurrentChapter] = useState([]);

    const navigate = useNavigate();
    const [selectedVersion, setSelectedVersion] = useState('KJV');

    const fetchBibleBooks = async () => {
        try {
            const response = await axios.get('https://www.brillianzhub.com/ipray/bible_books/');
            setBibleBooks(response.data);
        } catch (error) {
            setError("Error fetching Bible books: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Fetching Bible books...");
        fetchBibleBooks();
    }, []);

    useEffect(() => {
        if (selectedBookId) {
            const fetchChapters = async () => {
                const response = await fetch(`https://www.brillianzhub.com/ipray/bible_chapters/?book_id=${selectedBookId}`);
                const data = await response.json();
                setChapters(data);
            };
            fetchChapters();
        }
    }, [selectedBookId]);


    const handleSearchClick = async (term = searchTerm) => {
        handleSearch({
            searchTerm: term,
            bibleBooks,
            setSelectedBookName,
            setSelectedChapterNumber,
            setVerses,
            setCurrentChapter,
            setSelectedVerse,
            selectedVersion
        });
        navigate('/bible');
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    }


    return (
        <BibleDataContext.Provider value={{
            bibleBooks,
            setBibleBooks,
            selectedBookName,
            setSelectedBookName,
            selectedChapterNumber,
            setSelectedChapterNumber,
            selectedChapterId,
            setSelectedChapterId,
            setSelectedBookId,
            selectedVerse,
            setSelectedVerse,
            searchTerm,
            setSearchTerm,
            selectedVersion,
            setSelectedVersion,
            handleSearchClick,
            handleKeyDown,
            navigate,
            verses,
            setVerses,
            chapters,
            currentChapter,
            setCurrentChapter,
            loading,
            setLoading,
            error,
            setError
        }}>
            {children}
        </BibleDataContext.Provider>
    );
};

