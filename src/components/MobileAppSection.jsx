import React from 'react';
import mobileAppImage from '../assets/images/mobile-app-image.jpg';
import './MobileAppSection.css';

const MobileAppSection = () => {
    return (
        <div className="app-section">
            <div className="app-content">
                <img src={mobileAppImage} alt="Mobile App" className="app-image" />
                <div className="app-text">
                    <h2 className="app-title">Access your Bible and Prayers anywhere</h2>
                    <p className="app-description">
                        Enjoy easy access to scripture, daily prayers, and inspiration right at your fingertips!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MobileAppSection;
