"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const Users = () => {
  const { data, isLoading, isError } = useQuery<{
    data: { id: string; name: string; email: string }[];
  }>({
    queryFn: async () => {
      const data = await axiosInstance.get("/users");
      return data;
    },
    queryKey: ["users"],
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        Something went wrong
      </div>
    );

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col gap-2.5">
        {data?.data?.map((user, index) => {
          return (
            <div key={index} className="border-b border-b-blue-600 p-5">
              <Link href={`/users/${user.id}`}>
                <h1 className="text-blue-600 hover:text-blue-950">
                  NAME - {user?.name}
                </h1>
              </Link>
              <h1>EMAIL -{user?.email}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
