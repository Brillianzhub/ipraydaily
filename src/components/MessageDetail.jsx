import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import './MessageDetail.css';

export const metadata = {
    title: "Message - IPray Daily",
    description: "Read messages and insights on IPray Daily.",
};

const MessageDetail = ({ post, slug, fullURL, }) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullURL)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&fullURL=${encodeURIComponent(fullURL)}`;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullURL)}&title=${encodeURIComponent(post.title)}`;


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
            {post.download_audio_link && (
                <div style={{ padding: 10 }} className="audio-player">
                    <audio controls>
                        <source
                            src="https://cloud.appwrite.io/v1/storage/buckets/6659a498002189004c46/files/666883d3002e9d7bdf69/view?project=6659a034000bb03e26e1&mode=admin"
                            type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                    </audio>


                </div>
            )}
            <p style={{ paddingTop: 10 }} className='message-det-date'>Read time: {`${post.read_time} mins`}</p>

            <div className="share-buttons">
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" >
                    <Image src="/images/facebook-share.png" alt="Share on Facebook" width={48} height={48} />
                </a>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" >
                    <Image src="/images/twitter-share.png" alt="Share on Twitter" width={48} height={48} />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" >
                    <Image src="/images/linkedin-share.png" alt="Share on LinkedIn" width={48} height={48} />
                </a>
            </div>


            <div className="body" dangerouslySetInnerHTML={{ __html: post.body }}></div>
            <div className="downloads">
                {post.download_link && (
                    <a href={post.download_link} target="_blank" rel="noopener noreferrer">
                        <button>Download DOC</button>
                    </a>
                )}
                {post.download_audio_link && (
                    <div className="audio-player">
                        <p>
                            <a href={post.download_audio_link} target="_blank" rel="noopener noreferrer">
                                <button>Download Audio</button>
                            </a>
                        </p>
                    </div>
                )}

            </div>

            {post.youtube_link && (
                <div className="youtube-preview">
                    <h3>Watch on YouTube</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={post.youtube_link.replace("watch?v=", "embed/")}
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
                </div>
            )}


            {post.author.profile && (
                <div className='authors-info'>
                    <div className='authors-photo'>
                        <Image
                            src={post.author.profile.photo}
                            alt={post.author.profile.lastname}
                            width={100}
                            height={100}
                        />
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
