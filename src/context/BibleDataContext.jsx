"use client"; // Add this line to mark the file as a client component

import React, { createContext, useContext, useState } from 'react';
import { useBibleBooks, useChapters } from '../hooks/useBibleDataHooks';
import { useRouter } from 'next/navigation';
import { handleSearch } from '../utils/bibleSearchUtils';

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

    const router = useRouter();

    const handleSearchClick = (term = inputValue || searchTerm) => {
        setSearchTerm(term)
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
        router.push('/bible');
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleSearchClick();
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
            handleSearchClick,
            handleKeyDown,
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
