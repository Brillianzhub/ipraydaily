import axios from 'axios';

export const fetchBibleBooks = async () => {
    const response = await axios.get('https://www.brillianzhub.com/ipray/bible_books/');
    return response.data;
};

export const fetchChaptersByBookId = async (bookId) => {
    const response = await fetch(`https://www.brillianzhub.com/ipray/bible_chapters/?book_id=${bookId}`);
    return await response.json();
};
