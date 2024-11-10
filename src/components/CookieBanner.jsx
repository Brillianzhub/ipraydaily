import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

const CookieBanner = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesDeclined')) {
                setShowBanner(true);
            }
        }, 30000);

        return () => clearTimeout(timer);
    }, []);

    const handleAcceptCookies = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowBanner(false);
    };

    const handleDeclineCookies = () => {
        localStorage.setItem('cookiesDeclined', 'true');
        setShowBanner(false);
    };

    const handleContinueWithoutAccepting = () => {
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="content-container">
            <div className="cookie-banner">
                <p>
                    We use cookies to improve your experience on our site. By accepting, you
                    agree to our <a href="/privacy-policy">Privacy Policy</a> and cookie policy.
                </p>
                <div className="cookie-buttons">
                    <button onClick={handleAcceptCookies}>Accept</button>
                    <button onClick={handleDeclineCookies}>Decline</button>
                    <button onClick={handleContinueWithoutAccepting}>Continue Without Accepting</button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
