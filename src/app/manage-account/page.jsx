"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BannerSection from '../../components/BannerSection';
import Sidebar from '../../components/Sidebar';
import '../../components/Home.css';
import '@/components/ManageAccount.css';

const ManageAccount = () => {
    return (
        <div className="home-container">
            <Navbar />
            <BannerSection />

            <div className="content-container">
                <div className="main-section">

                    <div className="privacy-policy">
                        <h2>Request Data Deletion</h2>
                        <p>
                            This page applies to the <strong>iPray Daily</strong> app by <strong>Brillianz Hub</strong>.
                            We respect your privacy and comply with Google Play’s Data Safety policy.
                        </p>

                        <p>
                            If you would like us to delete some or all of your personal data (such as prayer notes, account details,
                            or profile information), you can send a request by clicking the button below or emailing us directly.
                        </p>

                        <a
                            href="mailto:support@ipraydaily.net?subject=Request%20for%20Data%20Deletion&body=Please%20delete%20my%20data%20associated%20with%20the%20iPray%20Daily%20app.%20Here%20are%20my%20details:"
                            className="delete-btn"
                        >
                            Request Data Deletion
                        </a>

                        <h3>What Data Will Be Deleted?</h3>
                        <ul>
                            <li>User account details (name, email, profile information)</li>
                            <li>Prayer notes and saved Bible plans</li>
                            <li>Any other personal data stored on our servers</li>
                        </ul>

                        <h3>What Data Will Be Retained?</h3>
                        <p>Certain information may be retained for legal, regulatory, or security reasons, such as:</p>
                        <ul>
                            <li>Transaction records (retained for up to 90 days)</li>
                            <li>Log data for security purposes (retained for up to 30 days)</li>
                        </ul>

                        <h3>Steps to Request Deletion</h3>
                        <ol>
                            <li>Click the button above or email us at <strong>support@ipraydaily.net</strong>.</li>
                            <li>Include your registered email address or account ID in the email.</li>
                            <li>Our team will process your request within 7 business days.</li>
                        </ol>
                    </div>

                </div>
                <Sidebar />
            </div>

            <Footer />
        </div>
    );
};

export default ManageAccount;
