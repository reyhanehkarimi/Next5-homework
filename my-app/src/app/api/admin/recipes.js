import React, { useState, useEffect } from "react";

function AdminRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({ name: "", instructions: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/v1/recipe");
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add recipe");
      const newRecipe = await res.json();
      setRecipes((prev) => [...prev, newRecipe]);
      setFormData({ name: "", instructions: "" });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      const res = await fetch(`/api/v1/recipes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete recipe");
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateRecipe = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/v1/recipes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update recipe");
      const updatedRecipe = await res.json();
      setRecipes((prev) =>
        prev.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
    } catch (error) {
        setError(error.message)
    }
  };

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error}</p>

  return (
    <div className="container mx-auto p-4">
        <h1>Admin: Recipes</h1>
        <form onSubmit={handleAddRecipe} className="mb-6">
        <input
          type="text"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Recipe
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Instructions</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className="border px-4 py-2">{recipe.id}</td>
              <td className="border px-4 py-2">{recipe.name}</td>
              <td className="border px-4 py-2">{recipe.instructions}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteRecipe(recipe.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    handleUpdateRecipe(recipe.id, {
                      name: prompt("New Name", recipe.name) || recipe.name,
                      instructions:
                        prompt("New Instructions", recipe.instructions) ||
                        recipe.instructions,
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

export default AdminRecipes;
