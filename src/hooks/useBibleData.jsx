import { useState, useEffect } from 'react';
import axios from 'axios';

const useBibleData = () => {
    const [bibleBooks, setBibleBooks] = useState([]);
    const [selectedBookName, setSelectedBookName] = useState("");
    const [selectedChapterNumber, setSelectedChapterNumber] = useState(null);
    const [selectedChapterId, setSelectedChapterId] = useState('');
    const [selectedVerse, setSelectedVerse] = useState([]);
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        fetchBibleBooks();
    }, []);

    return {
        bibleBooks,
        loading,
        error,
        selectedBookName,
        setSelectedBookName,
        selectedChapterNumber,
        setSelectedChapterNumber,
        selectedVerse,
        setSelectedVerse,
        verses,
        setVerses,
    };
};

export default useBibleData;
