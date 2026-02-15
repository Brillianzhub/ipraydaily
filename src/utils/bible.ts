// Bible Books Data - Old and New Testament
export const bibleBooks = {
    oldTestament: [
        { name: "Genesis", abbreviation: "Gen" },
        { name: "Exodus", abbreviation: "Exod" },
        { name: "Leviticus", abbreviation: "Lev" },
        { name: "Numbers", abbreviation: "Num" },
        { name: "Deuteronomy", abbreviation: "Deut" },
        { name: "Joshua", abbreviation: "Josh" },
        { name: "Judges", abbreviation: "Judg" },
        { name: "Ruth", abbreviation: "Ruth" },
        { name: "1 Samuel", abbreviation: "1Sam" },
        { name: "2 Samuel", abbreviation: "2Sam" },
        { name: "1 Kings", abbreviation: "1Kgs" },
        { name: "2 Kings", abbreviation: "2Kgs" },
        { name: "1 Chronicles", abbreviation: "1Chr" },
        { name: "2 Chronicles", abbreviation: "2Chr" },
        { name: "Ezra", abbreviation: "Ezra" },
        { name: "Nehemiah", abbreviation: "Neh" },
        { name: "Esther", abbreviation: "Esth" },
        { name: "Job", abbreviation: "Job" },
        { name: "Psalms", abbreviation: "Ps" },
        { name: "Proverbs", abbreviation: "Prov" },
        { name: "Ecclesiastes", abbreviation: "Eccl" },
        { name: "Song of Solomon", abbreviation: "Song" },
        { name: "Isaiah", abbreviation: "Isa" },
        { name: "Jeremiah", abbreviation: "Jer" },
        { name: "Lamentations", abbreviation: "Lam" },
        { name: "Ezekiel", abbreviation: "Ezek" },
        { name: "Daniel", abbreviation: "Dan" },
        { name: "Hosea", abbreviation: "Hos" },
        { name: "Joel", abbreviation: "Joel" },
        { name: "Amos", abbreviation: "Amos" },
        { name: "Obadiah", abbreviation: "Obad" },
        { name: "Jonah", abbreviation: "Jonah" },
        { name: "Micah", abbreviation: "Mic" },
        { name: "Nahum", abbreviation: "Nah" },
        { name: "Habakkuk", abbreviation: "Hab" },
        { name: "Zephaniah", abbreviation: "Zeph" },
        { name: "Haggai", abbreviation: "Hag" },
        { name: "Zechariah", abbreviation: "Zech" },
        { name: "Malachi", abbreviation: "Mal" }
    ],
    newTestament: [
        { name: "Matthew", abbreviation: "Matt" },
        { name: "Mark", abbreviation: "Mark" },
        { name: "Luke", abbreviation: "Luke" },
        { name: "John", abbreviation: "John" },
        { name: "Acts", abbreviation: "Acts" },
        { name: "Romans", abbreviation: "Rom" },
        { name: "1 Corinthians", abbreviation: "1Cor" },
        { name: "2 Corinthians", abbreviation: "2Cor" },
        { name: "Galatians", abbreviation: "Gal" },
        { name: "Ephesians", abbreviation: "Eph" },
        { name: "Philippians", abbreviation: "Phil" },
        { name: "Colossians", abbreviation: "Col" },
        { name: "1 Thessalonians", abbreviation: "1Thess" },
        { name: "2 Thessalonians", abbreviation: "2Thess" },
        { name: "1 Timothy", abbreviation: "1Tim" },
        { name: "2 Timothy", abbreviation: "2Tim" },
        { name: "Titus", abbreviation: "Titus" },
        { name: "Philemon", abbreviation: "Phlm" },
        { name: "Hebrews", abbreviation: "Heb" },
        { name: "James", abbreviation: "Jas" },
        { name: "1 Peter", abbreviation: "1Pet" },
        { name: "2 Peter", abbreviation: "2Pet" },
        { name: "1 John", abbreviation: "1John" },
        { name: "2 John", abbreviation: "2John" },
        { name: "3 John", abbreviation: "3John" },
        { name: "Jude", abbreviation: "Jude" },
        { name: "Revelation", abbreviation: "Rev" }
    ]
};

// Flattened array of all Bible books for easy mapping
export const allBibleBooks = [
    ...bibleBooks.oldTestament,
    ...bibleBooks.newTestament
];

// Helper function to get book by name or abbreviation
export const findBook = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    return allBibleBooks.find(book =>
        book.name.toLowerCase() === term ||
        book.abbreviation.toLowerCase() === term
    );
};