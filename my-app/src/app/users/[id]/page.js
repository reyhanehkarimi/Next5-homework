"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UserCard = dynamic(() => import("../../components/UserCard"), {
  ssr: false,
})

export default function UserDetail({ params }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch user details");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [params.id]);

  useEffect(() => {
    if (user) {
      document.title = `${user.firstName} ${user.lastName}`;
    } else {
      document.title = "User Detail";
    }
  }, [user]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-50">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 flex items-center justify-center">
      <UserCard user={user} />
    </div>
  );
}
