import { useMutation } from "@tanstack/react-query";
import { api } from "./axiosInstance";
import { LoginPayload, LoginResponse } from "../interfaces/auth";


export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationKey: ["login"],
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post("/accounts/login/", payload);
      return res.data;
    },
  });
};
