import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the slug from URL
import axios from 'axios';
import DOMPurify from 'dompurify';
import './MessageDetail.css';

const MessageDetail = () => {
    const { slug } = useParams();
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://www.brillianzhub.com/blog/${slug}`);
                console.log(response.data); // Log the response to see the structure
                setBlogPost(response.data.post); // Adjust this based on actual API structure
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch post details');
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!blogPost) {
        return <div>No post found</div>;
    }

    const {
        author = {},
        reviewed_by = {},
        factchecked_by = {},
        title = '',
        description = '',
        publish,
        created,
        last_updated,
        body = '',
        read_time = 0,
        categories = [],
        related_posts = [],
        key_takeaways = [],
        download_audio_link = '',
        youtube_link = '',
        download_link = ''
    } = blogPost;

    const cleanBody = DOMPurify.sanitize(body);

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };


    return (
        <div className="message-detail">
            <h1>{title}</h1>
            <p className='message-det-date'>{formatDate(blogPost.created)}</p>
            <p className='message-det-date'>Read time: {`${read_time} mins`}</p>
            <div className="body" dangerouslySetInnerHTML={{ __html: cleanBody }}></div>

            <div className="downloads">
                {download_link && (
                    <a href={download_link} target="_blank" rel="noopener noreferrer">
                        <button>Download DOC</button>
                    </a>
                )}
                {download_audio_link && (
                    <a href={download_audio_link} target="_blank" rel="noopener noreferrer">
                        <button>Download Audio</button>
                    </a>
                )}
            </div>

            {youtube_link && (<div className="youtube-preview">
                <h3>Watch on YouTube</h3>
                <iframe
                    width="560"
                    height="315"
                    src={youtube_link.replace("watch?v=", "embed/")}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <p>
                    <a href={youtube_link} target="_blank" rel="noopener noreferrer">
                        Watch on YouTube
                    </a>
                </p>
            </div>)}

            <div className='authors-info'>
                {author.profile && (
                    <div className='authors-photo'>
                        <img src={author.profile.photo} />
                    </div>
                )}
                {author.profile && (
                    <div className='authors-profile'>
                        <h3>SUMMARISED BY:</h3>
                        <h3>{author.profile.lastname} {author.profile.firstname}</h3>
                        <p>{author.profile.bios}</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default MessageDetail;
