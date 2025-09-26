import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { Prayer } from "../interfaces/prayers";

export const useFetchPrayers = () => {
    return useQuery<Prayer[], Error>({
      queryKey: ["prayers"],
      queryFn: async () => {
        const res = await api.get("/prayers/prayers-with-scripture/");
        return res.data;
      },
      staleTime: 1000 * 60 * 30, // cache for 30 min
    });
  };