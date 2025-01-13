"use client"
import React, { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/v1/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = res.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add user");
      const newUser = await res.json();
      setUsers((prev) => [...prev, newUser]);
      setFormData({ name: "", email: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await fetch(`/api/v1/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateUser = async (id, updateData) => {
    try {
      const res = await fetch(`/api/v1/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updatedUser = await res.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? updatedUser : user))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if(Loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>



  return (
    <div>
      <h1>Admin: Users</h1>

      <form>
        <input 
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 mr-2"
        />
        <input 
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
          Add user
        </button>
      </form>

      <table>
        <thead>
          <tr>
          <th className="border px-4 py2">ID</th>
          <th className="border px-4 py2">Name</th>
          <th className="border px-4 py2">Email</th>
          <th className="border px-4 py2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  >
                  Delete
                </button>

                <button onClick={() => 
                  handleUpdateUser(user.id, {
                    name: prompt("New Name", user.name) || user.name,
                    email: prompt("New Email", user.email) || user.email
                  })
                }
                className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
