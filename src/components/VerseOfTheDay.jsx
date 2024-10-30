import React, { useEffect, useState, useCallback } from 'react';
import './VerseOfTheDay.css';
import Link from 'next/link';
import Image from 'next/image';



const VerseOfTheDay = ({
    bibleBooks,
    randomVerse,
    setRandomVerse
}) => {
    const [promises, setPromises] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.brillianzhub.com/ipray/promises/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPromises(data);
                // setCurrentPromise(response.data[Math.floor(Math.random() * response.data.length)]);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (promises.length > 0) {
            const intervalId = setInterval(() => {
                const randomPromise = promises[Math.floor(Math.random() * promises.length)];
                setCurrentPromise(randomPromise);
            }, 86400000);
            return () => clearInterval(intervalId);
        }
    }, [promises]);


    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)]


    const fetchRandomVerse = useCallback(async () => {
        if (!bibleBooks || bibleBooks.length === 0) {
            console.error("Bible books data is not available.");
            return;
        }

        const randomBook = getRandomItem(bibleBooks);

        if (!randomBook || !randomBook.id) {
            console.error("No valid book selected.");
            return;
        }

        try {
            const chaptersResponse = await fetch(`https://www.brillianzhub.com/ipray/bible_chapters/?book_id=${randomBook.id}`);
            const chapters = await chaptersResponse.json();

            if (!chapters || chapters.length === 0) {
                console.error("No chapters available for the selected book.");
                return;
            }

            const randomChapter = getRandomItem(chapters);

            if (!randomChapter || !randomChapter.id) {
                console.error("No valid chapter selected.");
                return;
            }

            const versesResponse = await fetch(`https://www.brillianzhub.com/ipray/bible_verses_kjv/?chapter_id=${randomChapter.id}`);
            const verses = await versesResponse.json();

            if (!verses || verses.length === 0) {
                console.error("No verses available for the selected chapter.");
                return;
            }

            const randomVerse = getRandomItem(verses);

            if (!randomVerse || !randomVerse.verse) {
                console.error("No valid verse selected.");
                return;
            }

            setRandomVerse({
                bookName: randomBook.name,
                chapterNumber: randomChapter.number,
                verse: randomVerse.verse,
                text: randomVerse.text,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [bibleBooks]);




    useEffect(() => {
        fetchRandomVerse();

        const intervalId = setInterval(() => {
            fetchRandomVerse();
        }, 86400000);

        return () => clearInterval(intervalId);
    }, [bibleBooks, fetchRandomVerse]);

    const bookReference = randomVerse ? `${randomVerse.bookName} ${randomVerse.chapterNumber}:${randomVerse.verse}` : 'Book';


    const handlePlayAudio = () => {
        if (randomVerse && randomVerse.text) {
            const speech = new SpeechSynthesisUtterance(randomVerse.text);
            speech.lang = 'en-US';
            window.speechSynthesis.speak(speech);
        }
    };


    const handleShare = async () => {
        try {
            const shareData = {
                title: "Verse of the Day",
                text: `${randomVerse.text} - ${randomVerse.verse}`,
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
                    <h2 className="verse-caption">VERSE OF THE DAY</h2>
                    <h3>{bookReference} - <span>(King James Version)</span></h3>
                    {randomVerse ? (
                        <p className="verse-content">
                            {randomVerse.text}
                        </p>
                    ) : (
                        <p className="verse-content">No verses selected.</p>
                    )}

                    <div className="action-container">
                        <div className="icon-container">
                            <button className="icon-button" aria-label="Share" onClick={handleShare}>
                                <Image
                                    src="/images/share.png"
                                    alt="Logo"
                                    width={48}
                                    height={48}
                                />

                            </button>
                            <button className="icon-button" aria-label="Play" onClick={handlePlayAudio}>
                                <Image
                                    src="/images/audio.png"
                                    alt="Logo"
                                    width={48}
                                    height={48}
                                />
                            </button>
                        </div>
                    </div>

                    <div className='continue-button'>
                        <Link href="/bible">
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

export default VerseOfTheDay;