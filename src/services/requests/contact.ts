// services/requests/contact.ts
import { useMutation } from "@tanstack/react-query";
import { api } from "./axiosInstance";

export type ContactPayload = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export type ContactResponse = {
    success?: boolean;
    message?: string;
    // add any other fields your API returns
};

export const useSubmitContact = () => {
    return useMutation<ContactResponse, Error, ContactPayload>({
        mutationFn: async (payload: ContactPayload) => {
            const { data } = await api.post("/contact/submit/", payload,
            );
            return data;
        },
    });
};
