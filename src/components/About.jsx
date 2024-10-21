import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h2>About IPray Daily</h2>

            <div className="about-section about-flex">
                <div className="about-text">
                    <p>
                        At <strong>IPray Daily</strong>, we’re a community of believers passionate about making prayer an essential part of everyday life. Our app helps busy people stay connected with God through daily prayer prompts and Bible references.
                    </p>
                </div>
                <div className="about-image-container">
                    <img src="src/assets/images/about.webp" alt="Prayer and Bible" className="about-image" />
                </div>
            </div>

            <div className="about-section about-flex reverse">
                <div className="about-image-container">
                    <img src="image2_url" alt="Categories of Prayer" className="about-image" />
                </div>
                <div className="about-text">
                    <p>
                        <strong>IPray Daily</strong> provides categorized prayer points and corresponding Bible verses to guide your prayers. From personal struggles to giving thanks, you’ll find prayer points for every need.
                    </p>
                </div>
            </div>

            <div className="about-section about-flex">
                <div className="about-text">
                    <p>
                        Rooted in faith, we believe in the power of prayer to transform lives and spread God's kingdom. We aim to help believers stay spiritually connected in a fast-paced world.
                    </p>
                </div>
                <div className="about-image-container">
                    <img src="image3_url" alt="Spiritual Growth" className="about-image" />
                </div>
            </div>
        </div>
    );
}

export default About;
