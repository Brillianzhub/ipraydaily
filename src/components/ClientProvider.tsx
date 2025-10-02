"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: true,
            staleTime: 5 * 60 * 1000,
        },
    },
});

export function ClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
        </QueryClientProvider>
    );
}