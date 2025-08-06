"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import '../../components/Home.css';
import '@/components/Terms.css';

const Terms = () => {
    return (
        <div className="home-container">
            <Navbar />
            <div className="banner-section">
                <h1>
                    Terms of Service&nbsp;
                    <span>iPray Daily App</span>
                </h1>
            </div>

            <div className="content-container">
                <div className="main-section">
                    <h2>Welcome to iPray Daily</h2>
                    <p>
                        These Terms of Service govern your use of the iPray Daily app provided by <strong>Brillianz Hub</strong>.
                        By using our app, you agree to these terms. Please read them carefully.
                    </p>

                    <h3>1. Data Collection & Usage</h3>
                    <p>
                        We collect and use your personal information (such as name, email, and prayer notes) to provide
                        personalized prayer and Bible study experiences. For details on what data we collect and why, please
                        review our <a href="/privacy-policy" className="inline-link">Privacy Policy</a>.
                    </p>

                    <h3>2. User Responsibilities</h3>
                    <ul>
                        <li>You agree to use the app for lawful purposes only.</li>
                        <li>You must not share harmful or offensive content.</li>
                        <li>You are responsible for keeping your account information secure.</li>
                    </ul>

                    <h3>3. Account & Data Deletion</h3>
                    <p>
                        You may request deletion of your personal data at any time without deleting your account by visiting our
                        <a href="/manage-account" className="inline-link"> Manage Account page</a> or emailing us at
                        <strong> support@ipraydaily.net</strong>. We will process your request within 7 business days.
                    </p>

                    <h3>4. Data Retention</h3>
                    <p>
                        Some information may be retained for legal or security purposes, such as transaction logs (up to 90 days)
                        and security logs (up to 30 days).
                    </p>

                    <h3>5. Third-Party Services</h3>
                    <p>
                        Our app may use trusted third-party services such as analytics or crash reporting tools. These services
                        comply with applicable data protection regulations.
                    </p>

                    <h3>6. Updates to Terms</h3>
                    <p>
                        We may update these terms from time to time. Continued use of the app after changes means you accept the updated terms.
                    </p>

                    <h3>Contact Us</h3>
                    <p>
                        If you have any questions about these Terms, please contact us at:
                        <br />
                        Email: <strong>support@ipraydaily.net</strong>
                    </p>
                </div>
                <Sidebar />
            </div>

            <Footer />
        </div>
    );
};

export default Terms;
