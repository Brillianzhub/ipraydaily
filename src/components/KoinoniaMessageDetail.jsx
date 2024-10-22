import React from "react";
import MessageDetail from "./MessageDetail";
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from "./Sidebar";

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
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}

export default KoinoniaMessageDetail;