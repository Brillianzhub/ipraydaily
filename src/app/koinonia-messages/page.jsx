import React from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import KoinoniaMessage from '../../components/KoinoniaMessage';
import Sidebar from '../../components/Sidebar';
import '../../components/Home.css';

const Koinonia = async () => {
    // Fetching data server-side
    const fetchPosts = async () => {
        try {
            const response = await axios.get('https://www.brillianzhub.com/blog/');
            return response.data;
        } catch (error) {
            console.error("Error fetching posts:", error);
            return []; // return an empty array on error
        }
    };

    const posts = await fetchPosts();

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
                    <KoinoniaMessage posts={posts} />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default Koinonia;
