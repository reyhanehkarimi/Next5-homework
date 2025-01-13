import React from "react";

export default function Modal({ image, onClose }) {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[80vh] object-contain"
        />
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
