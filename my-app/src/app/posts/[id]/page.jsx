"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";

function PostsDetails({ params }) {
  const { id } = params; 
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const resPost = await fetch(`https://dummyjson.com/posts/${id}`);
        if (!resPost.ok) throw new Error("Failed to fetch post");
        const data = await resPost.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.body.slice(0, 150)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.body.slice(0, 150)} />
      </Head>
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-white to-green-50 p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600">{post.body}</p>
        </div>
        <div className="text-center">
          <button
            onClick={() => window.history.back()}
            className="w-full py-2 px-4 bg-green-950 text-white font-bold rounded-lg hover:bg-green-800 transition duration-300"
          >
            Back to Posts
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default PostsDetails;