import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { Devotion } from "../interfaces/devotion";

export const useFetchTodayDevotion = () => {
  return useQuery<Devotion, Error>({
    queryKey: ["todayDevotion"],
    queryFn: async () => {
      const res = await api.get("/devotion/today/");
      return res.data;
    },
    staleTime: 1000 * 60 * 60, // cache for 1 hour
  });
};
