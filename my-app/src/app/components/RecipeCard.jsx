"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function RecipeCard({ recipe }) {
  const router = useRouter();

  return (
  <div className="min-h-screen bg-gradient-to-r from-red-50 via-white to-red-50 p-8 flex items-center justify-center">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-6">
          <div className="inline-block mb-4">
            <div className="relative w-24 h-24 mx-auto">
              <Image
                className="rounded-full border-4 border-white shadow-md"
                src={recipe.image}
                alt={recipe.name}
                width={96} 
                height={96} 
                layout="intrinsic" 
                objectFit="cover" 
              />
            </div>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">{recipe.name}</h3>
          <p className="text-lg text-gray-600">{recipe.cuisine}</p>
        </div>

        <div className="text-center">
          <button
            className="w-full py-2 px-4 bg-red-950 text-white font-bold rounded-lg hover:bg-red-800 transition duration-300"
            onClick={() => router.push(`/recipes/${recipe.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div> 
    );
}

export default RecipeCard;
