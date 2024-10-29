import React from 'react';
// import DOMPurify from 'dompurify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

import Head from 'next/head';

import './MessageDetail.css';

const MessageDetail = ({ post, relatedPosts, categories, seoTitle, seoDescription, slug, blogPost }) => {
    

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
                <title>{post.title}</title>
                <meta name="description" content={post.description} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:image" content={post.image} />
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/koinonia-messages/${slug}`} />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.description} />
                <meta name="twitter:image" content={post.image} />
            </Head>

            <h1>{post.title}</h1>
            <p className='message-det-date'>Read time: {`${post.read_time} mins`}</p>

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

            <div className="body" dangerouslySetInnerHTML={{ __html: post.body }}></div>
            <div className="downloads">
                {post.download_link && (
                    <a href={post.download_link} target="_blank" rel="noopener noreferrer">
                        <button>Download DOC</button>
                    </a>
                )}
                {post.download_audio_link && (
                    <a href={post.download_audio_link} target="_blank" rel="noopener noreferrer">
                        <button>Download Audio</button>
                    </a>
                )}
            </div>

            {post.youtube_link && (<div className="youtube-preview">
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
                    <a href={post.youtube_link} target="_blank" rel="noopener noreferrer">
                        Watch on YouTube
                    </a>
                </p>
            </div>)}

            {post.author.profile && (
                <div className='authors-info'>
                    <div className='authors-photo'>
                        <img src={post.author.profile.photo} alt={post.author.profile.lastname} />
                    </div>
                    <div className='authors-profile'>
                        <h3>SUMMARISED BY:</h3>
                        <h3>{post.author.profile.lastname} {post.author.profile.firstname}</h3>
                        <p>{post.author.profile.bios}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageDetail;
