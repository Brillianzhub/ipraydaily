// services/requests/blogs.ts
import {useQuery} from "@tanstack/react-query";
import { api } from "./axiosInstance";


export type Blog = {
    id: number;
    author: string;                // e.g. "Name (email)"
    category: string;              // e.g. "Prayer"
    title: string;
    description: string;
    slug: string;
    body: string;                  // full article
    publish: string;               // ISO
    last_updated: string;          // ISO
    created: string;               // ISO
    image: string | null;          // URL or null
    featured: boolean;
    status: "draft" | "published" | string;
    read_time: number;             // minutes
};

/** Detail may include extra fields like body, created, last_updated, status */
export type BlogDetail = {
    body?: string;
    created?: string;
    last_updated?: string;
    status?: string;
};

export const useFetchBlogs = () => {
    return useQuery<any, Error>({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await api.get("/blogs/fetch/");
            return res.data as Blog[];
        },
        staleTime: 1000 * 60 * 30, // 30 min
    });
};

/** Fetch a single blog by slug */
export const useFetchBlogBySlug = (slug: string) => {
    return useQuery<any, Error>({
        queryKey: ["blog", slug],
        queryFn: async () => {
            const res = await api.get(`/blogs/fetch/${encodeURIComponent(slug)}/`);
            return res.data as BlogDetail;
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 10,
    });
};
