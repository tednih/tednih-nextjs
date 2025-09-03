import { useState } from "react";

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  if (!Array.isArray(images) || images.length === 0) {
    return <p>Loading...</p>;
  }

  const length = images.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
        {images.map((img, index) => (
          <div
            key={index}
            className={`transition-opacity duration-500 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0 absolute"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-primary p-2 rounded-full shadow"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-primary p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
  );
}
