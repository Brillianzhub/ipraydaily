import React, { useState, useEffect } from 'react';
import './PrayerPage.css';

const PrayerPage = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Blessing');
    const [prayers, setPrayers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://www.brillianzhub.com/ipray/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchPrayers = async () => {
            if (!selectedCategory) return;

            setLoading(true);
            try {
                const response = await fetch(`https://www.brillianzhub.com/ipray/prayerpoints/by_category/?category=${selectedCategory}`);
                const data = await response.json();
                setPrayers(data);
            } catch (error) {
                console.error('Error fetching prayers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrayers();
    }, [selectedCategory]);

    return (
        <div className="prayer-container">
            {loading && <p>Loading...</p>}

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-dropdown"
            >
                <option value="" disabled>Select a Category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.title}>
                        {category.title}
                    </option>
                ))}
            </select>

            {prayers.length > 0 ? (
                <div className="prayer-list">
                    {prayers.map(prayer => (
                        <div key={prayer.id} className="prayer-item">
                            <h3>{prayer.category.title}</h3>
                            <p>{prayer.text}</p>
                            <p><span>{prayer.bible_quotation}</span>&nbsp;
                                {prayer.bible_verse}
                            </p>

                        </div>
                    ))}
                </div>
            ) : (
                <p>No prayers available for this category.</p>
            )}
        </div>
    );
}

export default PrayerPage;
