"use client";
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import '../../components/Home.css';
import '@/components/ContactForm.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            message,
        };

        setLoading(true);

        try {
            const response = await fetch('https://www.brillianzhub.com/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                setName('');
                setEmail('');
                setMessage('');
                setSubmitted(true);
            } else {
                alert('Failed to send the message.');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="banner-section">
                <h1>
                    ...Men ought always to pray, and not to faint.&nbsp;
                    <span>Luke 18:1 (KJV)</span>
                </h1>
            </div>
            <div className="content-container">
                <div className="main-section">
                    {submitted ? (
                        <div className="thank-you-message">
                            <h2>Thank you for your message!</h2>
                            <p>We will get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default Contact;