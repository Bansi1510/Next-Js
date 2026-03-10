"use client";

import { userContextData } from "@/context/UserContext";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";

const Page = () => {
  const data = useContext(userContextData)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      if (data?.user) {
        setName(data.user.name || "");
        setImage(data.user.image || "");
      }
    }
    fetchData();
  }, [data?.user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const previewUrl = URL.createObjectURL(selectedFile);
      setImage(previewUrl);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const formData = new FormData();

      formData.append("name", name);

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.post("/api/edit", formData);

      data?.setUser(res.data)
      setLoading(false)
      router.push("/")
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {data?.user ? (
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10 text-center">

          {/* Image */}
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

              {/* Hover overlay */}
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

          {/* Name Input */}
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
            {loading ? "Updating" : "Update Profile"}
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