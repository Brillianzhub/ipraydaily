import React, { useEffect, useCallback } from 'react';
import './VerseOfTheDay.css';
import Link from 'next/link';
import Image from 'next/image';


const PrayerOfTheDay = ({ prayer, currentPrayer, setCurrentPrayer }) => {

    const getRandomPrayer = useCallback(async () => {
        if (prayer.length > 0) {
            const randomPrayer = prayer[Math.floor(Math.random() * prayer.length)];
            setCurrentPrayer(randomPrayer);
        }
    }, [prayer]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getRandomPrayer();
        }, 86400000);

        return () => clearInterval(intervalId);
    }, [getRandomPrayer]);


    const handlePlayAudio = () => {
        if (currentPrayer && currentPrayer.text) {
            const speech = new SpeechSynthesisUtterance(currentPrayer.text);
            speech.lang = 'en-US';
            window.speechSynthesis.speak(speech);
        }
    };


    const handleShare = async () => {
        try {
            const shareData = {
                title: "Verse of the Day",
                text: `${currentPrayer.text} - ${currentPrayer.bible_verse}`,
                url: "https://www.ipraydaily.com"
            };

            if (navigator.share) {
                await navigator.share(shareData);
                console.log('Verse shared successfully');
            } else {
                const fullText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;
                await navigator.clipboard.writeText(fullText);
                alert('Link copied to clipboard');
            }
        } catch (error) {
            console.error("Error sharing content", error);
        }
    };


    return (
        <>
            <div className="verse-section">
                <div className="main-bar">
                    <h2 className="verse-caption">PRAYER OF THE DAY</h2>
                    <h3>{currentPrayer.category.title} - <span>{currentPrayer.bible_quotation}</span></h3>
                    <p className="verse-content">
                        {currentPrayer.text}
                    </p>

                    <div className="action-container">
                        <div className="icon-container">
                            <button className="icon-button" aria-label="Share" onClick={handleShare}>
                                <Image src="/images/share.png" alt="Logo" width={48} height={48} />
                            </button>
                            <button className="icon-button" aria-label="Play" onClick={handlePlayAudio}>
                                <Image src="/images/audio.png" alt="Logo" width={48} height={48} />
                            </button>
                        </div>
                    </div>
                    <div className='continue-button'>
                        <Link href="/prayers">
                            <button className="continue-reading-button">
                                Continue Reading
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );

}

export default PrayerOfTheDay;