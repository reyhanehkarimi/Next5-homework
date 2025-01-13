"use client";
import React, { useEffect, useState } from "react";
// import RecipeCard from "../components/RecipeCard";
import Image from "next/image";
import dynamic from "next/dynamic";
const RecipeCard = dynamic(() => import("../components/RecipeCard"), { ssr: false });


function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchRecipes = async () => {
      try {
        const resRecipes = await fetch("https://dummyjson.com/recipes");
        if (!resRecipes.ok) throw new Error("Failed to fetch recipes");
        const recipesData = await resRecipes.json();
        
        if (isMounted) setRecipes(recipesData.recipes); 
      } catch (error) {
        if (isMounted) setError(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRecipes();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.title = "Recipes";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.content = "Browse through a collection of recipes on various topics";
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Browse through a collection of recipes on various topics";
      document.head.appendChild(newMeta);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container mx-auto p-4 bg-gradient-to-r from-red-50 via-white to-red-50 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-900">Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id || recipe.name} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}

export default RecipesList;








