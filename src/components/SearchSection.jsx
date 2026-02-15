import React from 'react';

import './SearchSection.css';
import { useBibleData } from '../context/BibleDataContext';

const SearchSection = () => {
    const {
        selectedVersion,
        setSelectedVersion,
        handleKeyDown,
        handleAPISearch,
        searchTerm,
        setSearchTerm,
    } = useBibleData();



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
                <button className="search-btn" onClick={handleAPISearch}>Search</button>
            </div>
        </div>
    );
}

export default SearchSection;
