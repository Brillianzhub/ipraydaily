import React from 'react';
import Link from 'next/link';
import './BlogPosts.css';
import Image from 'next/image';

const KoinoniaMessage = ({ posts }) => {
    const truncateText = (text, limit) => {
        return text.length > limit ? text.slice(0, limit) + '...' : text;
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
                        <Image src={post.image} alt={post.title} layout='response' width={100} height={80} />
                        <h3>{post.title}</h3>
                        <p>{truncateText(post.description, 100)}</p>
                        <div className='blog-date'>
                            <p>{formatDate(post.created)} | {post.read_time} mins read</p>
                            <Link href={`/koinonia-messages/${post.slug}`}>
                                <h3>View Message</h3>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KoinoniaMessage;
