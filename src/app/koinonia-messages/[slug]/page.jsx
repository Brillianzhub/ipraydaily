import React from "react";
import axios from 'axios';
import MessageDetail from "../../../components/MessageDetail";
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Sidebar from "../../../components/Sidebar";
import '../../../components/Home.css';
import BannerSection from "@/components/BannerSection";


const KoinoniaMessageDetail = async ({ params }) => {
    const { slug } = await params;

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`https://www.brillianzhub.com/blog/${slug}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching post details:", error);
            return null;
        }
    };

    const blogPost = await fetchPostDetails();

    const { post, related_posts, categories, seo_title, seo_description } = blogPost || {};

    const fullURL = `${process.env.NEXT_PUBLIC_SITE_URL}/koinonia-messages/${slug}`;


    return (
        <div className="home-container">
            <Navbar />
            <BannerSection />
            <div className="content-container">
                <div className="main-section">
                    {blogPost ? (
                        <MessageDetail
                            post={post}
                            relatedPosts={related_posts}
                            categories={categories}
                            seoTitle={seo_title}
                            seoDescription={seo_description}
                            slug={slug}
                            fullURL={fullURL}
                        />
                    ) : (
                        <div>Error fetching post details.</div>
                    )}
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
};

export default KoinoniaMessageDetail;
