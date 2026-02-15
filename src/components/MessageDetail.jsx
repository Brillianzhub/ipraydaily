import React from 'react';
// import Head from 'next/head';
import Image from 'next/image';

import styles from './MessageDetail.module.css';

export const metadata = {
    title: "Message - IPray Daily",
    description: "Read messages and insights on IPray Daily.",
};

const MessageDetail = ({ post, fullURL }) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullURL)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&fullURL=${encodeURIComponent(fullURL)}`;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullURL)}&title=${encodeURIComponent(post.title)}`;

    console.log(post.category)
    return (
        <div className={styles.messageDetail}>
            {/* <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.description} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:image" content={post.image} />
                <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/koinonia-messages/${slug}`} />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.description} />
                <meta name="twitter:image" content={post.image} />
            </Head> */}

            <h1>{post.title}</h1>
            {/* {post.download_audio_link && (
                <div style={{ padding: 10 }} className="audio-player">
                    <audio controls>
                        <source
                            src={post.download_audio_link}
                            type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )} */}
            <p style={{ paddingTop: 10 }} className={styles.messageDetDate}>Read time: {`${post.read_time} mins`}</p>

            <div className={styles.shareButtons}>
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                    <Image src="/images/facebook-share.png" alt="Share on Facebook" width={48} height={48} />
                </a>
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                    <Image src="/images/twitter-share.png" alt="Share on Twitter" width={48} height={48} />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Image src="/images/linkedin-share.png" alt="Share on LinkedIn" width={48} height={48} />
                </a>
            </div>

            <div className={styles.body} dangerouslySetInnerHTML={{ __html: post.body }}></div>
            <div className={styles.downloads}>
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
                <div className={styles.youtubePreview}>
                    <h3>Watch on YouTube</h3>
                    <iframe
                        width="560"
                        height="450"
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
                <div className={styles.authorsInfo}>
                    <div className={styles.authorsPhoto}>
                        <Image
                            src={post.author.profile.photo}
                            alt={post.author.profile.lastname}
                            width={100}
                            height={100}
                        />
                    </div>
                    {post.category !== 3 ? (
                        <div className={styles.authorsProfile}>
                            <h3>WRITTEN BY:</h3>
                            <h3>{post.author.profile.lastname} {post.author.profile.firstname}</h3>
                            <p>{post.author.profile.bios}</p>
                        </div>
                    ) : (
                        <div className={styles.authorsProfile}>
                            <h3>SUMMARISED BY:</h3>
                            <h3>{post.author.profile.lastname} {post.author.profile.firstname}</h3>
                            <p>{post.author.profile.bios}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessageDetail;
