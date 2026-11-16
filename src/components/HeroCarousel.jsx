import { useState, useEffect } from 'react';
import { BANNERS } from '../config/banners';

const HeroCarousel = () => {
  const [banners, setBanners] = useState(() =>
    BANNERS.map((banner, index) => ({ ...banner, id: index }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const ocultarBanner = (id) => {
    setBanners((prevBanners) => prevBanners.filter((banner) => banner.id !== id));
  };

  useEffect(() => {
    if (banners.length <= 1) return undefined;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const indiceActual = currentIndex < banners.length ? currentIndex : 0;

  return (
    <div className="relative w-full h-[260px] md:h-[320px] m-0 overflow-hidden rounded-2xl group shadow-2xl">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === indiceActual ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href={banner.enlace}
            className="block h-full w-full"
            aria-label={banner.titulo}
          >
            <img
              src={banner.imagen}
              alt={banner.titulo}
              className="absolute inset-0 h-full w-full object-cover object-center"
              onError={() => ocultarBanner(banner.id)}
            />
          </a>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-200/90 via-base-200/20 to-transparent"></div>
        </div>
      ))}

      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-base-100/50 hover:bg-base-100 border-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ❮
      </button>

      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-base-100/50 hover:bg-base-100 border-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === indiceActual ? "w-8 bg-primary" : "w-4 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
