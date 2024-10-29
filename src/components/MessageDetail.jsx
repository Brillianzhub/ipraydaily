"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { useMeta } from '../context/MetaContext.jsx';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head'; // Import Head from next/head

import './MessageDetail.css';

const MessageDetail = () => {
    const router = useRouter();
    const slug = router.query.slug;

    // const { slug } = router.query;

    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { metaData, setMetaData } = useMeta();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://www.brillianzhub.com/blog/${slug}`);
                const post = response.data.post;
                setBlogPost(post);
                setLoading(false);

                setMetaData({
                    title: post.title,
                    description: post.description,
                    image: post.image,
                    url: window.location.href
                });
            } catch (err) {
                setError('Failed to fetch post details');
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug, setMetaData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!blogPost) return <div>No post found</div>;

    const {
        author = {},
        title = '',
        body = '',
        read_time = 0,
        download_link = '',
        download_audio_link = '',
        youtube_link = ''
    } = blogPost;

    const cleanBody = DOMPurify.sanitize(body);

    const handleShare = (platform) => {
        const shareData = {
            title,
            text: blogPost.description,
            url: window.location.origin + `/koinonia-messages/${slug}`
        };

        const encodedUrl = encodeURIComponent(shareData.url);
        const encodedText = encodeURIComponent(shareData.text);

        let url;
        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`;
                break;
            default:
                return;
        }
        window.open(url, '_blank');
    };

    return (
        <div className="message-detail">
            <Head>
                <title>{metaData.title}</title>
                <meta property="og:title" content={metaData.title} />
                <meta property="og:description" content={metaData.description} />
                <meta property="og:image" content={metaData.image} />
                <meta property="og:url" content={metaData.url} />
                <meta name="twitter:title" content={metaData.title} />
                <meta name="twitter:description" content={metaData.description} />
                <meta name="twitter:image" content={metaData.image} />
            </Head>

            <h1>{title}</h1>
            <p className='message-det-date'>Read time: {`${read_time} mins`}</p>

            {/* <div className="share-buttons">
                <button onClick={() => handleShare('facebook')} className="share-btn facebook">
                    <FontAwesomeIcon icon={faFacebook} />
                </button>
                <button onClick={() => handleShare('twitter')} className="share-btn twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                </button>
                <button onClick={() => handleShare('linkedin')} className="share-btn linkedin">
                    <FontAwesomeIcon icon={faLinkedin} />
                </button>
                <button onClick={() => handleShare()} className="share-btn native">
                    <FontAwesomeIcon icon={faShareAlt} />
                </button>
            </div> */}

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

            {author.profile && (
                <div className='authors-info'>
                    <div className='authors-photo'>
                        <img src={author.profile.photo} alt={author.profile.lastname} />
                    </div>
                    <div className='authors-profile'>
                        <h3>SUMMARISED BY:</h3>
                        <h3>{author.profile.lastname} {author.profile.firstname}</h3>
                        <p>{author.profile.bios}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageDetail;
