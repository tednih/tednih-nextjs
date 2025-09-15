"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

export default function MiniCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!Array.isArray(images) || images.length === 0) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const length = images.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return (
    <>
      <div className="relative w-full max-w-sm mx-auto py-3 px-2">
        {/* Image wrapper */}
        <div className="overflow-hidden rounded-md shadow-lg">
          {images.map((img, index) => (
            <div
              key={index}
              className={`${
                index === current ? "opacity-100" : "opacity-0 absolute"
              }`}
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-48 object-cover rounded-md cursor-pointer"
                onClick={() => setIsOpen(true)}
              />
            </div>
          ))}
        </div>

        {/* Glass buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 
            backdrop-blur-md bg-white/20 dark:bg-black/30 
            border border-white/30 p-2 rounded-full 
            shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 
            backdrop-blur-md bg-white/20 dark:bg-black/30 
            border border-white/30 p-2 rounded-full 
            shadow-lg hover:scale-110 transition-transform"
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-3 gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === current
                  ? "bg-darkprimary dark:bg-primary scale-125"
                  : "bg-gray-400/50 hover:bg-gray-500"
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>

      {/* Popup modal pakai portal */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
            <div className="relative max-w-3xl w-full p-4">
              <img
                src={images[current]}
                alt="Full View"
                className="w-full max-h-[80vh] object-contain rounded-md shadow-xl"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-1 right-1
                  backdrop-blur-md bg-white/20 dark:bg-black/30 
                  border border-white/30 p-2 rounded-full 
                  shadow-lg hover:scale-110 transition-transform text-white"
              >
                <XCircleIcon className="w-4 h-4" />
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
