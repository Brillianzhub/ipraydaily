import React, { useState } from 'react';
import { handleSearch } from '../utils/bibleSearchUtils';

import './SearchSection.css';

const SearchSection = ({
    bibleBooks,
    setSelectedBookName,
    setSelectedChapterNumber,
    setSelectedVerse,
    setVerses
}) => {
    const prayerCategories = ["Healing", "Thanksgiving", "Salvation"];
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchClick = () => {
        handleSearch({
            searchTerm,
            bibleBooks,
            setSelectedBookName,
            setSelectedChapterNumber,
            setVerses,
            setSelectedVerse
        });
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    }

    return (
        <div className="search-div">
            <div className="search-row">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search by Bible verse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="dropdown-row">
                    <select className="dropdown">
                        <option value="" disabled>Select Prayer Category</option>
                        {prayerCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <button className="search-btn" onClick={handleSearchClick}>Search</button>
            </div>
        </div>
    );
}

export default SearchSection;
