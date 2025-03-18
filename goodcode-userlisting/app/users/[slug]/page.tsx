"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const User = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery<{
    data: {
      id: string;
      name: string;
      email: string;
      website: string;
      phone: string;
    };
  }>({
    queryFn: async () => {
      const data = await axiosInstance.get(`/users/${params?.slug}`);
      return data;
    },
    queryKey: ["user", params?.slug],
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center h-screen">Something went wrong</div>;

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <button
        className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        onClick={() => router.back()}
      >
       Back To Users
      </button>
      <div className="flex flex-col gap-2.5">
        <h1>NAME    -{data?.data?.name}</h1>
        <h1>EMAIL   -{data?.data?.email}</h1>
        <h1>PHONE   -{data?.data?.phone}</h1>
        <h1>WEBSITE -{data?.data?.website}</h1>
      </div>
    </div>
  );
};

export default User;
