import React from "react";
import Link from "next/link";

const images = [
  {
    id: "1",
    src: "https://w0.peakpx.com/wallpaper/101/95/HD-wallpaper-burgers-fast-food-delicious-food-sandwiches-harmful-food.jpg",
    alt: "Image 1",
  },
  {
    id: "2",
    src: "https://images6.alphacoders.com/439/439410.jpg",
    alt: "Image 2",
  },
  {
    id: "3",
    src: "https://img.lovepik.com/photo/20211118/medium/lovepik-delicious-barbecue-food-picture_480002638.jpg",
    alt: "Image 3",
  },
];

export default function Home() {
  return (
    <>
      <head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to the home page!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Welcome to the Home Page
        </h1>

        {/* بخش اصلی */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 h-full">
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <Link href="/users">
              <span className="text-2xl font-semibold text-blue-500 hover:text-blue-700">
                Users
              </span>
            </Link>
            <p className="mt-2 text-gray-500">Manage user data and profiles</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <Link href="/posts">
              <span className="text-2xl font-semibold text-green-500 hover:text-green-700">
                Posts
              </span>
            </Link>
            <p className="mt-2 text-gray-500">Explore and share blog posts</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
            <Link href="/recipes">
              <span className="text-2xl font-semibold text-red-500 hover:text-red-700">
                Recipes
              </span>
            </Link>
            <p className="mt-2 text-gray-500">Discover delicious recipes</p>
          </div>
        </nav>

        {/* بخش ادمین */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Admin Dashboard
          </h2>
          <nav className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
              <Link href="/admin/users">
                <span className="text-2xl font-semibold text-purple-500 hover:text-purple-700">
                  Manage Users
                </span>
              </Link>
              <p className="mt-2 text-gray-500">Modify user profiles and data</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
              <Link href="/admin/posts">
                <span className="text-2xl font-semibold text-teal-500 hover:text-teal-700">
                  Manage Posts
                </span>
              </Link>
              <p className="mt-2 text-gray-500">Edit or delete blog posts</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-transform duration-300 transform hover:scale-105">
              <Link href="/admin/recipes">
                <span className="text-2xl font-semibold text-orange-500 hover:text-orange-700">
                  Manage Recipes
                </span>
              </Link>
              <p className="mt-2 text-gray-500">Edit or delete recipes</p>
            </div>
          </nav>
        </div>

        {/* گالری تصاویر */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image) => (
              <Link key={image.id} href={`/gallery/modal/${image.id}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
