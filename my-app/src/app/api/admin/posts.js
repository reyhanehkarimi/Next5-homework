"use client";
import React, { useState, useEffect } from "react";

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/v1/posts");
        if (!res.ok) return new Error("Failed to fetch posts!");
        const data = res.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleAddPost = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/v1/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) return new Error("Failed to add post");
      const newPost = await res.json();
      setPosts((prev) => [...prev, newPost]);
      setFormData({ title: "", content: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const res = await fetch(`/api/v1/posts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("failed to delete post");
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdatePost = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/v1/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update post");
      const updatedPost = await res.json();
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? updatedData : post))
      );
    } catch (error) {
        setError(error.message)
    }
  };

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin: Posts</h1>
        <form onSubmit={handleAddPost} className="mb-6">
            <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 mr-2"
            />

            <input 
            type="text"
            placeholder="Content"
            value={(e) => 
                setFormData({ ...formData, content: e.target.value })
            }
            className="border p-2 mr-2"
            />
            <button type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            >Add post
            </button>
        </form>


        <table>
            <thead>
                <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Content</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post) => {
                    <tr key={post.id}>
                        <td className="border px-4 py-2">{post.id}</td>
                        <td className="border px-4 py-2">{post.title}</td>
                        <td className="border px-4 py-2">{post.content}</td>
                        <td className="border px-4 py-2">
                            <button onClick={() => handleDeletePost(post.id)}
                                className="bg-red-500 text-white rounded mr-2"
                                >
                                Delete
                            </button>
                            <button onClick={() => 
                                handleUpdatePost(post.id, {
                                    title: prompt("New Title", post.title) || post.title,
                                    content: prompt("New Content", post.content) || post.content
                                })
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            >Update</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  );
}

export default AdminPosts;






