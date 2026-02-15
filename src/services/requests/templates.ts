import { useQuery } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { ShareTemplate } from "../interfaces/templates";

  
  export const useFetchShareTemplates = () => {
    return useQuery<ShareTemplate[], Error>({
      queryKey: ["shareTemplates"],
      queryFn: async () => {
        const res = await api.get("/sharetemplates/templates/");
        return res.data;
      },
      staleTime: 1000 * 60 * 30, // cache for 30 min
    });
  };
  