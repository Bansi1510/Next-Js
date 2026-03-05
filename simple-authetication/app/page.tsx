"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaEdit } from "react-icons/fa";

const Page = () => {
  const { data } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      {data?.user ? (
        <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-10 text-center">

          {/* Pencil Icon */}
          <button className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition duration-200">
            <FaEdit className="text-gray-600 hover:text-gray-800 text-lg" />
          </button>

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              {data.user.image && (
                <Image
                  src={data.user.image}
                  alt="User Image"
                  fill
                  className="rounded-full object-cover border-4 border-gray-200"
                />
              )}
            </div>
          </div>

          {/* Name */}
          <h2 className="mt-6 text-2xl font-semibold text-gray-800">
            {data.user.name}
          </h2>

          {/* Email */}
          <p className="text-gray-500 mt-2">
            {data.user.email}
          </p>

          {/* Sign Out */}
          <button
            onClick={() => signOut()}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition duration-300"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome 👋
          </h2>
          <p className="text-gray-500 mt-3">
            Please login to view your profile information.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;