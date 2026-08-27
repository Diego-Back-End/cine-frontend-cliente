import { useState, useEffect } from 'react';

// Banners horizontales de prueba
const mockBanners = [
  { id: 1, image: "https://cdn.cinemark.cl/content/banners/home/1787754185862-large-large-endgame-encore-PREVENTA.webp", title: "Avengers Endgame:Encore" },
  { id: 2, image: "https://cdn.cinemark.cl/content/banners/home/1786389820853-large-full-t2-preventa.webp", title: "Terminator" },
  { id: 3, image: "https://cdn.cinemark.cl/content/banners/home/1787773024250-large-large-coyote.webp", title: "Coyote vs Acme" }
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Funciones para avanzar o retroceder
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mockBanners.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mockBanners.length - 1 : prevIndex - 1));
  };

  // Temporizador para el cambio automático (cada 5 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    
    // Limpiamos el temporizador si el usuario cambia de página o interactúa
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[180px] md:h-[320px] lg:h-[400px] overflow-hidden rounded-2xl group shadow-2xl">
      {/* Imágenes con efecto de transición (Fade in) */}
      {mockBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          {/* Sombra inferior oscura para que los textos resalten */}
          <div className="absolute inset-0 bg-gradient-to-t from-base-200/90 via-base-200/20 to-transparent"></div>
        </div>
      ))}

      {/* Flecha Izquierda */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-base-100/50 hover:bg-base-100 border-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ❮
      </button>

      {/* Flecha Derecha */}
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-base-100/50 hover:bg-base-100 border-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        ❯
      </button>

      {/* Indicadores inferiores (Líneas estilo Cinemark) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
        {mockBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              index === currentIndex ? "w-8 bg-primary" : "w-4 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;