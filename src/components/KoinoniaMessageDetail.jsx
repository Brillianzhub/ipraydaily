import React from "react";
import MessageDetail from "./MessageDetail";
import Navbar from './Navbar';
import Footer from './Footer';

const KoinoniaMessageDetail = () => {
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
                    <MessageDetail />
                </div>
                <div className="sidebar-section">
                    <h2>Sidebar</h2>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default KoinoniaMessageDetail;