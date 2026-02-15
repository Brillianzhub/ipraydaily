import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <h2>Loading...</h2>
      <div className="privacy-warning">
        <p>
          By using this site, you agree to our <a href="/privacy-policy">Privacy Policy</a> and <a href="/cookies-policy">Cookie Policy</a>.
          We use cookies to improve user experience and analyze website traffic.
        </p>
        <button className="accept-button">Accept</button>
      </div>
    </div>
  );
};

export default LoadingScreen;
