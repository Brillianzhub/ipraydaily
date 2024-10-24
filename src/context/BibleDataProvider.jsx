import React, { createContext, useContext } from 'react';
import useBibleData from '../hooks/useBibleData.jsx';


const BibleContext = createContext();

export const useBibleContext = () => useContext(BibleContext)

const BibleDataProvider = ({ children }) => {

    const {
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
        setVerses
    } = useBibleData();

    return (
        <BibleContext.Provider
            value={{
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
                setVerses
            }}
        >
            {children}
        </BibleContext.Provider>
    );
};

export default BibleDataProvider;
