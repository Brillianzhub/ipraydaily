"use client";
import React, { useState } from 'react';
import './Sidebar.css';
import Image from 'next/image';


const Sidebar = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const handleSubscribe = async () => {
        try {
            const response = await fetch('https://www.brillianzhub.com/ipray/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.log("Error:", error);
            setMessage('Failed to subscribe. Please try again later.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubscribe();
    };



    return (
        <div className="sidebar-section">
            <div className="social-media-links">
                <h3>Follow Us</h3>
                <div className="social-media-icons">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/images/facebook.png"
                            alt="Facebook"
                            width={48}
                            height={48}
                        />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/images/twitter.png"
                            alt="X"
                            width={48}
                            height={48}
                        />
                    </a>

                    <a href="https://www.youtube.com/@KoinoniaMessage/videos" target="_blank" rel="noopener noreferrer">
                        <Image
                            src="/images/youtube.png"
                            alt="YouTube"
                            width={48}
                            height={48}
                        />
                    </a>
                </div>

                <p>Subscribe to our newsletter and recieve a selection of cool articles every month.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Subscribe</button>
                </form>
                {message && <p>{message}</p>}
                {/* <button onClick={handleSubscribe} disabled={!isChecked}>
                    SUBSCRIBE
                </button> */}
                {message && <p className="message">{message}</p>}
                <div className="terms-checkbox">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="terms">
                        By clicking this box, you confirm that you have read and are agreeing to our terms of
                        use regarding the storage of the data submitted through this form.
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;