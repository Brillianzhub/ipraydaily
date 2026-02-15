import axios from 'axios';

const BASE_URL = "https://www.brillianzhub.com/ipray/search_verses/";

export const fetchSearchResults = async (searchTerm) => {

    try {
        const response = await axios.get(BASE_URL, {
            params: { query: searchTerm },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
};
