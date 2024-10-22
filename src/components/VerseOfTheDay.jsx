import React, { useEffect, useRef, useState } from 'react';
import './VerseOfTheDay.css';
import play from "../assets/images/audio.png";
import share from "../assets/images/share.png";


const VerseOfTheDay = ({
    bibleBooks,
    randomVerse,
    setRandomVerse
}) => {
    const [promises, setPromises] = useState([]);
    const [currentPromise, setCurrentPromise] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.brillianzhub.com/ipray/promises/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPromises(data);

                setCurrentPromise(response.data[Math.floor(Math.random() * response.data.length)]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        if (promises.length > 0) {
            const intervalId = setInterval(() => {
                const randomPromise = promises[Math.floor(Math.random() * promises.length)];
                setCurrentPromise(randomPromise);
            }, 120000); // 120,000 milliseconds = 2 minutes

            // Cleanup interval when the component unmounts
            return () => clearInterval(intervalId);
        }
    }, [promises]);


    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)]

    const fetchRandomVerse = () => {
        if (!bibleBooks || bibleBooks.length === 0) {
            console.error("Bible books data is not available.");
            return;
        }

        const randomBook = getRandomItem(bibleBooks);

        if (!randomBook || !randomBook.id) {
            console.error("No valid book selected.");
            return;
        }

        fetch(`https://www.brillianzhub.com/ipray/bible_chapters/?book_id=${randomBook.id}`)
            .then(response => response.json())
            .then(chapters => {
                if (!chapters || chapters.length === 0) {
                    console.error("No chapters available for the selected book.");
                    return;
                }

                const randomChapter = getRandomItem(chapters);

                if (!randomChapter || !randomChapter.id) {
                    console.error("No valid chapter selected.");
                    return;
                }

                fetch(`https://www.brillianzhub.com/ipray/bible_verses_kjv/?chapter_id=${randomChapter.id}`)
                    .then(response => response.json())
                    .then(verses => {
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
                    })
                    .catch(error => console.error("Error fetching verses:", error));
            })
            .catch(error => console.error("Error fetching chapters:", error));
    };



    useEffect(() => {
        fetchRandomVerse();

        const intervalId = setInterval(() => {
            fetchRandomVerse();
        }, 120000);

        return () => clearInterval(intervalId);
    }, [bibleBooks]);

    const bookReference = randomVerse ? `${randomVerse.bookName} ${randomVerse.chapterNumber}:${randomVerse.verse}` : 'Book';

    const audioRef = useRef(null);

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

    console.log(currentPromise)
    return (
        <>
            <div className="verse-section">
                <div className="main-bar">
                    <h2 className="verse-caption">VERSE OF THE DAY</h2>
                    <h3>{bookReference} (King James Version)</h3>
                    {randomVerse ? (
                        <p className="verse-content">
                            <span>{randomVerse.verse}</span> {randomVerse.text}
                        </p>
                    ) : (
                        <p className="verse-content">No verses selected.</p>
                    )}

                    <div className="action-container">
                        <div className="icon-container">
                            <button className="icon-button" aria-label="Share" onClick={handleShare}>
                                <img src={share} alt="Share" />
                            </button>
                            <button className="icon-button" aria-label="Play" onClick={handlePlayAudio}>
                                <img src={play} alt="Play" />
                            </button>
                        </div>
                    </div>
                    <div className='continue-button'>
                        <button className="continue-reading-button">
                            Continue Reading
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default VerseOfTheDay;
