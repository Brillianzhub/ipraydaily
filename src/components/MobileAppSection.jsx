import React from 'react';
import './MobileAppSection.css';
import Image from 'next/image';

const MobileAppSection = () => {
    return (
        <div className="app-section">
            <div className="app-content">
                <Image
                    src="/images/mobile-app-image.jpg"
                    alt="Mobile App"
                    className="app-image"
                    layout="responsive"  // allows the image to resize responsively
                    width={500}          // source width of the image
                    height={300}
                />
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
