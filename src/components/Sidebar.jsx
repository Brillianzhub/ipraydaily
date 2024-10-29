import React, { useState } from 'react';
import './Sidebar.css';


const Sidebar = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
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
                    <img src="/images/facebook.png" alt="Facebook" />
                    <img src="/images/twitter.png" alt="X" />
                    <img src="/images/youtube.png" alt="Youtube" />
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