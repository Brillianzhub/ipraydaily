import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { Hymn } from "../interfaces/hymn";

export const useFetchHymns = () => {
  return useQuery<Hymn[], Error>({
    queryKey: ["hymns"],
    queryFn: async () => {
      const res = await api.get("/hymns/");
      return res.data;
    },
    staleTime: Infinity, // keeps it cached forever unless invalidated
  });
};
