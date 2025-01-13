"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const PostCard = dynamic(() => import("../components/PostCard"), { ssr: false });

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const resPosts = await fetch("https://dummyjson.com/posts");
        if (!resPosts.ok) throw new Error("Failed to fetch posts");
        const data = await resPosts.json();
        setPosts(data.posts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Head>
        <title>{posts.length > 0 ? `Posts List: ${posts[0].title}` : "Posts List"}</title>
        <meta
          name="description"
          content={
            posts.length > 0
              ? `Featured: ${posts[0].body.slice(0, 150)}`
              : "Browse through a collection of posts on various topics."
          }
        />
        <meta
          property="og:title"
          content={posts.length > 0 ? `Posts List: ${posts[0].title}` : "Posts List"}
        />
        <meta
          property="og:description"
          content={
            posts.length > 0
              ? `Explore: ${posts[0].body.slice(0, 150)}`
              : "Explore a variety of posts on different topics and enjoy reading!"
          }
        />
      </Head>

      <div className="container mx-auto p-4 bg-gradient-to-r from-green-50 via-white to-green-50 text-center">
        <h1 className="text-2xl font-semibold text-green-700">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PostsList;
