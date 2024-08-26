import { useRef } from "react";
import Image from "../assets/game.jpg";

const IgnSlider = () => {
  const sliderRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: Image,
      alt: "Slide 1",
    },
    { id: 2, image: Image, alt: "Slide 2" },
    { id: 3, image: Image, alt: "Slide 3" },
    { id: 3, image: Image, alt: "Slide 3" },
    { id: 3, image: Image, alt: "Slide 3" },
    { id: 3, image: Image, alt: "Slide 3" },
    { id: 3, image: Image, alt: "Slide 3" },
    { id: 3, image: Image, alt: "Slide 3" },
  ];

  const scrollToSlide = (index) => {
    if (sliderRef.current) {
      const width = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({ left: index * width, behavior: "smooth" });
    }
  };

  return (
    <main>
      <div className="relative w-full overflow-hidden">
      <h1 className="text-3xl text-white font-bold p-2">Latest Releases</h1>
        <div
          ref={sliderRef}
          className="flex overflow-x-scroll scroll-snap-type-x-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-[40%]"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="block w-full p-2"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className="w-2 h-2 bg-white rounded-full"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default IgnSlider;
