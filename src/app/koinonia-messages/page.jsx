import React from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import KoinoniaMessage from '../../components/KoinoniaMessage';
import Sidebar from '../../components/Sidebar';
import Head from 'next/head';
import '../../components/Home.css';

const Koinonia = async () => {
    const fetchPosts = async () => {
        try {
            const response = await fetch('https://www.brillianzhub.com/blog/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data.results); // Log to inspect structure

            // Check if data is an array
            return Array.isArray(data.results) ? data.results : [];
        } catch (error) {
            console.error("Error fetching posts:", error);
            return [];
        }
    };



    const posts = await fetchPosts();

    console.log(posts)

    return (
        <div className="home-container">
            <Head>
                <title>Koinonia Messages - IPray Daily</title>
                <meta name="description" content="Explore the latest messages from Koinonia Global on IPray Daily." />
                <meta property="og:title" content="Koinonia Messages - IPray Daily" />
                <meta property="og:description" content="Get access to inspiring messages from Koinonia Global." />
                <meta property="og:url" content="https://ipraydaily.net/koinonia-messages" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://ipraydaily.net/koinonia-messages" />
            </Head>


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
