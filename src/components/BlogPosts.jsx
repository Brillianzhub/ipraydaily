import React from 'react';
import blogPostImage from '../assets/images/blog-post.png';
import './BlogPosts.css'


const BlogPosts = () => {
    const blogPosts = [
        {
            image: blogPostImage,
            title: 'Finding Peace in Prayer',
            description: 'Explore how prayer can bring peace and comfort in times of uncertainty.',
            date: 'October 12, 2024',
            readTime: '3 mins read'
        },
        {
            image: blogPostImage,
            title: 'The Power of Scripture',
            description: 'Uncover the transformative power of God’s Word in your daily life.',
            date: 'October 10, 2024',
            readTime: '4 mins read'
        },
        {
            image: blogPostImage,
            title: 'Living a Prayerful Life',
            description: 'Learn practical ways to incorporate prayer into your everyday activities.',
            date: 'October 5, 2024',
            readTime: '5 mins read'
        }
    ];

    return (
        <>
            <section className="blog-section">
                <h2>Latest Blog Posts</h2>
                <div className="main-content">
                    {blogPosts.map((post, index) => (
                        <div className="blog-post">
                            <img src={post.image} alt="Post 1" />
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                            <p>{post.date} | {post.readTime} mins read</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default BlogPosts;