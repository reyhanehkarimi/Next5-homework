"use client";

import React from "react";
import { useRouter } from "next/navigation";

function PostCard({ post }) {
  const router = useRouter();

  return (
    <div className="min-h-11 bg-gradient-to-r from-green-50 via-white to-green-50  items-center flex flex-col justify-start rounded-3xl">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 flex flex-col justify-start h-auto m-6">
        <div className="text-center mb-6 flex flex-col justify-start">
          <h3 className="text-3xl font-semibold text-gray-800 mb-2">{post.title}</h3>
          
        </div>

        <div className="text-center mt-auto">
          <button
            className="w-full py-2 px-4 bg-green-950 text-white font-bold rounded-lg hover:bg-green-800 transition duration-300"
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
