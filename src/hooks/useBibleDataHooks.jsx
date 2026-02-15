import { useEffect, useState } from 'react';
import { fetchBibleBooks, fetchChaptersByBookId } from '../utils/bibleApi';

export const useBibleBooks = () => {
    const [bibleBooks, setBibleBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBibleBooks();
                setBibleBooks(data.results);
            } catch (err) {
                setError("Error fetching Bible books: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    return { bibleBooks, loading, error };
};

export const useChapters = (selectedBookId) => {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const loadChapters = async () => {
            if (selectedBookId) {
                const data = await fetchChaptersByBookId(selectedBookId);
                setChapters(data.results);
            }
        };

        loadChapters();
    }, [selectedBookId]);

    return chapters;
};
