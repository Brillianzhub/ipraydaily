export function isNumber(char) {
    return !isNaN(parseInt(char));
}

export function parseReference(reference) {
    const parts = reference.trim().split(':');
    const bookAndChapter = parts[0].split(' ');

    let bookName = bookAndChapter.slice(0, -1).join(' ');
    const firstLetter = bookName.split('')[0];
    const restOfBook = bookName.split('').slice(1).join('').trim();

    if (isNumber(firstLetter)) {
        bookName = firstLetter + ' ' + restOfBook;
    }

    const verse = parts[1] || null;
    let startVerse, endVerse;

    if (verse === null) {
        startVerse = 1;
        endVerse = null;
    } else if (verse.includes("-")) {
        const [start, end] = verse.split("-");
        startVerse = parseInt(start);
        endVerse = parseInt(end);
    } else {
        startVerse = parseInt(verse);
        endVerse = startVerse;
    }

    return {
        book: bookName,
        chapter: bookAndChapter[bookAndChapter.length - 1],
        verse: verse,
        startVerse: startVerse,
        endVerse: endVerse
    };
}

export function handleSearch({
    searchTerm = "",
    bibleBooks = [],
    setCurrentChapter = () => { },
    setSelectedBookName = () => { },
    setSelectedChapterNumber = () => { },
    setVerses = () => { },
    setSelectedVerse = () => { },
    selectedVersion = "",
} = {}) {
    if (searchTerm) {
        const searchRef = parseReference(searchTerm);

        const foundBook = bibleBooks.find(book => book.name.toLowerCase() === searchRef.book.toLowerCase());

        if (foundBook) {
            setSelectedBookName(foundBook.name);

            fetch(`https://www.brillianzhub.com/ipray/bible_chapters/?book_id=${foundBook.id}`)
                .then(response => response.json())
                .then(chapterData => {
                    const foundChapter = chapterData.find(chapter => chapter.number === parseInt(searchRef.chapter));

                    if (foundChapter) {
                        setSelectedChapterNumber(foundChapter.number);
                        setCurrentChapter(foundChapter)

                        let apiUrl = '';
                        if (selectedVersion === 'KJV') {
                            apiUrl = `https://www.brillianzhub.com/ipray/bible_verses_kjv/?chapter_id=${foundChapter.id}`;
                        } else if (selectedVersion === 'AMP') {
                            apiUrl = `https://www.brillianzhub.com/ipray/bible_verses_amp/?chapter_id=${foundChapter.id}`;
                        } else if (selectedVersion === 'NIV') {
                            apiUrl = `https://www.brillianzhub.com/ipray/bible_verses_niv/?chapter_id=${foundChapter.id}`;
                        } else if (selectedVersion === 'ASV') {
                            apiUrl = `https://www.brillianzhub.com/ipray/bible_verses_asv/?chapter_id=${foundChapter.id}`;
                        }

                        fetch(apiUrl)
                            .then(response => response.json())
                            .then(verseData => {
                                if (!searchRef.verse) {
                                    searchRef.startVerse = 1;
                                    searchRef.endVerse = verseData.length;
                                }
                                setSelectedVerse(verseData);

                                const foundVerses = verseData.filter(verse =>
                                    verse.verse >= searchRef.startVerse && verse.verse <= searchRef.endVerse
                                );

                                if (foundVerses.length > 0) {
                                    setVerses(foundVerses);
                                } else {
                                    console.error("Verses not found");
                                }
                            })
                            .catch(error => console.error("Error fetching verses:", error));
                    } else {
                        console.error("Chapter not found");
                    }
                })
                .catch(error => console.error("Error fetching chapters:", error));
        } else {
            console.error("Book not found");
        }
    }
}
