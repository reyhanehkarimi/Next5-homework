"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";


export default function RecipeDetails({ params }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/recipes/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch recipe details");
        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [params.id]);

  useEffect(() => {
    if (recipe) {
      document.title = `${recipe.name || "Recipe Detail"}`;

      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = recipe.description || "Detailed recipe description";
    } else {
      document.title = "Recipe Detail";
      let metaDescription = document.querySelector("meta[name='description']");
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = "Browse recipe details and learn how to make your favorite meals.";
    }
  }, [recipe]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-gradient-to-r from-red-50 via-white to-red-50">
      <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg pt-10">
        <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={recipe.image || "https://via.placeholder.com/150"}
            alt={recipe.name || "Recipe Image"}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mt-6">
          {recipe.name || "Recipe Name"}
        </h1>

        <div className="mt-4 text-gray-600 space-y-2">
          <p><strong>Cuisine:</strong> {recipe.cuisine || "N/A"}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty || "N/A"}</p>
          <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes || 0} minutes</p>
          <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes || 0} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings || "N/A"}</p>
          <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing || "N/A"}</p>
          <p><strong>Rating:</strong> {recipe.rating || "N/A"} ({recipe.reviewCount || 0} reviews)</p>
        </div>

        {recipe.ingredients?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Ingredients:</h2>
            <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}

        {recipe.instructions?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Instructions:</h2>
            <ol className="list-decimal pl-6 mt-2 text-gray-700 space-y-1">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        )}

        {recipe.tags?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800">Tags:</h2>
            <p className="text-gray-700 mt-2">{recipe.tags.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
