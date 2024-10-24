// src/utils/bibleSearchUtils.js

// Helper function to check if a character is a number
export function isNumber(char) {
    return !isNaN(parseInt(char));
}

// Function to parse Bible reference (e.g., "John 3:16" or "1 Kings 3:6")
export function parseReference(reference) {
    const parts = reference.split(':');
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

// Handle search function
// bibleSearchUtils.js
export function handleSearch({
    searchTerm = "",
    bibleBooks = [],
    setSelectedBookName = () => { },
    setSelectedChapterNumber = () => { },
    setVerses = () => { },
    setSelectedVerse = () => { }
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

                        fetch(`https://www.brillianzhub.com/ipray/bible_verses_kjv/?chapter_id=${foundChapter.id}`)
                            .then(response => response.json())
                            .then(verseData => {
                                if (!searchRef.verse) {
                                    searchRef.startVerse = 1;
                                    searchRef.endVerse = verseData.length;
                                }

                                const foundVerses = verseData.filter(verse =>
                                    verse.verse >= searchRef.startVerse && verse.verse <= searchRef.endVerse
                                );

                                if (foundVerses.length > 0) {
                                    setVerses(foundVerses);
                                    setSelectedVerse(foundVerses);
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
