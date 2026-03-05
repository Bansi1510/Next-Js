"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";

const Page = () => {
  const { data } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(() => data?.user?.name || "");
  const [image, setImage] = useState(() => data?.user?.image || "");

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
    }
  };

  const handleUpdate = () => {
    console.log("Updated Name:", name);
    console.log("Updated Image:", image);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {data?.user ? (
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10 text-center">

          {/* Clickable Image */}
          <div className="flex justify-center">
            <div
              className="relative w-32 h-32 cursor-pointer group"
              onClick={handleImageClick}
            >
              {image && (
                <Image
                  src={image}
                  alt="User Image"
                  fill
                  className="rounded-full object-cover border-4 border-gray-200 group-hover:opacity-80 transition"
                />
              )}

              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition text-white text-sm font-medium">
                Change
              </div>
            </div>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Editable Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="mt-6 w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Update Button */}
          <button
            onClick={handleUpdate}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-300"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Please login to edit profile
          </h2>
        </div>
      )}
    </div>
  );
};

export default Page;