import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogPosts.css';

const KoinoniaMessage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://www.brillianzhub.com/blog/');
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch blog posts');
                setLoading(false);
            }
        };

        fetchPosts();
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
        <section className="blog-section">
            <h2>Latest Messages from Koinonia Global</h2>
            <div className="message-list">
                {posts.map((post, index) => (
                    <div className="blog-post" key={index}>
                        <img src={post.image} alt={post.title} />
                        <h3>{post.title}</h3>
                        <p>{truncateText(post.description, 100)}</p>
                        <div className='blog-date'>
                            <p>{formatDate(post.created)} | {post.read_time} mins read</p>
                            <Link to={`/koinonia-messages/${post.slug}`}>
                                <h3>View Message</h3>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default KoinoniaMessage;
