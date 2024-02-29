"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import { trpc } from "@/utils/trpc";

import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./modals/CreateListing";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
        {/* modals */}
        <>
          <CreateListing />
        </>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
