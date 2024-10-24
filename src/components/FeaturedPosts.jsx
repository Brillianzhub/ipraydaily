import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedPosts.css';

const FeaturedPosts = () => {
    const [featuredPosts, setFeaturedPosts] = useState([]);

    useEffect(() => {
        const fetchtFeaturedPosts = async () => {
            try {
                const response = await fetch('https://www.brillianzhub.com/blog');
                const data = await response.json();
                setFeaturedPosts(data.slice(0, 3))
            } catch (error) {
                console.log("Failed to fetch data", error)
            }
        }
        fetchtFeaturedPosts();
    }, []);

    const truncateText = (text, limit) => {
        if (text.length > limit) {
            return text.slice(0, limit) + '...';
        }
        return text;
    };

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    return (
        <div className='featured-post-section'>
            <h2 className='featured-posts-title'>KOINONIA MESSAGES!</h2>
            <div className='featured-posts'>
                {featuredPosts.map((post, index) => (
                    <div className='featured-posts-list' key={index} >
                        <img src={post.image} alt='Image' />
                        <h3>{post.title}</h3>
                        <p>{truncateText(post.description, 50)}</p>
                        <div className='blog-date'>
                            <p>{formatDate(post.created)} | {post.read_time} mins read</p>
                            <Link to={`/koinonia-messages/${post.slug}`}>
                                <h3>View Message</h3>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="complete-list">
                <Link to={`/koinonia-messages`}>
                    <h3>View All Messages</h3>
                </Link>
            </div> */}
        </div>
    )
}

export default FeaturedPosts;