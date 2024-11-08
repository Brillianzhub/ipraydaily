"use client";
import React, { createContext, useContext, useState } from 'react';
import { useBibleBooks, useChapters } from '../hooks/useBibleDataHooks';
import { useRouter } from 'next/navigation';
import { fetchSearchResults } from '../utils/searchUtils';


const BibleDataContext = createContext();

export const useBibleData = () => useContext(BibleDataContext);

export const BibleDataProvider = ({ children }) => {
    const [selectedBookName, setSelectedBookName] = useState("");
    const [selectedChapterNumber, setSelectedChapterNumber] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState('');
    const [selectedVerse, setSelectedVerse] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('KJV');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChapterId, setSelectedChapterId] = useState('');
    const [verses, setVerses] = useState([]);
    const [currentChapter, setCurrentChapter] = useState([]);
    const { bibleBooks, loading, error } = useBibleBooks();
    const chapters = useChapters(selectedBookId);
    const [showNextChapter, setShowNextChapter] = useState(false);


    const [nextChapter, setNextChapter] = useState([]);


    const [results, setResults] = useState([]);

    const router = useRouter();

    const handleAPISearch = async () => {
        const query = `${searchTerm} & ${selectedVersion}`;
        const data = await fetchSearchResults(query);
        setResults(data);
        setShowNextChapter(false);

        if (nextChapter.length > 0) {
            setNextChapter([]);
        }

        router.push('/bible');
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleAPISearch();
        }
    }


    return (
        <BibleDataContext.Provider value={{
            bibleBooks,
            selectedBookName,
            setSelectedBookName,
            selectedChapterNumber,
            setSelectedChapterNumber,
            selectedBookId,
            setSelectedBookId,
            selectedVerse,
            setSelectedVerse,
            selectedVersion,
            searchTerm,
            setSearchTerm,
            setSelectedVersion,
            currentChapter, setCurrentChapter,
            selectedChapterId, setSelectedChapterId,
            handleKeyDown,

            showNextChapter,
            setShowNextChapter,

            nextChapter,
            setNextChapter,

            handleAPISearch,
            results,
            setResults,
            inputValue,
            verses,
            setVerses,
            setInputValue,
            chapters,
            loading,
            error
        }}>
            {children}
        </BibleDataContext.Provider>
    );
};
