import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";

// Define BibleVerse or Chapter response type (based on your API shape)
export interface BibleVerse {
    id: number;
    verse: number;
    text: string;
}

export const useFetchBibleChapter = (
    version: string,
    bookName: string,
    chapterNumber: number
) => {
    return useQuery<BibleVerse[], Error>({
        queryKey: ["bible", version, bookName, chapterNumber],
        queryFn: async () => {
            const res = await api.get(
                `/bibles/${version}/${bookName}/${chapterNumber}/`
            );
            return res.data;
        },
        enabled: !!version && !!bookName && !!chapterNumber, // only run when args are present
        staleTime: 1000 * 60 * 10, // cache 10 minutes
    });
};