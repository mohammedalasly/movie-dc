import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieHero = ({ images }) => {
  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef(null);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const handleNext = () => {
    if (index >= extendedImages.length - 1) return;
    setIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const handlePrev = () => {
    if (index <= 0) return;
    setIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      if (index === extendedImages.length - 1) {
        setIsTransitioning(false);
        setIndex(1);
      } else if (index === 0) {
        setIsTransitioning(false);
        setIndex(extendedImages.length - 2);
      }
    };

    const slider = sliderRef.current;
    slider.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      slider.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [index, extendedImages.length, isTransitioning]);

  const getTranslate = () =>
    `translateX(-${index * (100 / extendedImages.length)}%)`;

  if (!images.length) return null;

  return (
    <div className="relative h-[50vh] md:h-[90vh] overflow-hidden rounded-b-4xl shadow-cyan-800 shadow-lg">
      <div
        ref={sliderRef}
        className="flex h-full"
        style={{
          width: `${extendedImages.length * 100}%`,
          transform: getTranslate(),
          transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none',
        }}
      >
        {extendedImages.map((img, i) => (
          <div
            key={`${img.file_path}-${i}`}
            style={{ width: `${100 / extendedImages.length}%` }}
            className="h-full flex-shrink-0"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${img.file_path}`}
              alt={`Backdrop ${i}`}
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-cyan-400/20 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronLeft size={40} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-cyan-400/20 hover:bg-black/60 text-white p-2 rounded-full"
      >
        <ChevronRight size={40} />
      </button>
    </div>
  );
};

export default MovieHero;
