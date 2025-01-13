"use client";

import React from "react";
import { useRouter } from "next/navigation";

function UserCard({ user }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 flex items-center justify-center">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            <img
              className="h-24 w-24 rounded-full border-4 border-white shadow-md"
              src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
              alt={`${user.firstName} ${user.lastName}`}
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
          <p className="text-lg text-gray-600">{user.email}</p>
        </div>

        <div className="text-center">
          <button
            className="w-full py-2 px-4 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition duration-300"
            onClick={() => router.push(`/users/${user.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
