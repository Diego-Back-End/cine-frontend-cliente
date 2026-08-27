import MovieCard from '../components/MovieCard';
import HeroCarousel from '../components/HeroCarousel';

// Datos temporales (Mock) para las tarjetas de abajo
const mockMovies = [
  { id: 1, title: "SPIDERMAN BRAND NEW DAY", genre: "Ciencia Ficción", duration: "166 min", rating: "+14", image: "https://cdn.cinemark.cl/content/posters/HO00015116.jpg" },
  { id: 2, title: "LA ODISEA", genre: "Acción - Drama", duration: "127 min", rating: "+18", image: "https://cdn.cinemark.cl/content/posters/HO00015098.jpg" },
  { id: 3, title: "LA MUERTE DE ROBBIN HOOD ", genre: "Acción", duration: "96 min", rating: "+18", image: "https://cdn.cinemark.cl/content/posters/HO00015321.jpg" },
  { id: 4, title: "MI VECINO TOTORO 1988", genre: "Animación - Anime", duration: "119 min", rating: "+10", image: "https://cdn.cinemark.cl/content/posters/HO00015252.jpg" },
  { id: 5, title: "LA NOCHE DEL DEMONIO: ESTÁN ENTRE NOSOTROS", genre: "TERROR SUSPENSO", duration: "150 min", rating: "+18", image: "https://cdn.cinemark.cl/content/posters/HO00015308.jpg" },
];

function CarteleraPage() {
  return (
    <main className="min-h-screen bg-base-200 py-6 px-4">
      <div className="container mx-auto max-w-7xl space-y-10">
        
        {/* Aquí está el nuevo Hero Banner */}
        <section>
          <HeroCarousel />
        </section>

        {/* Aquí empieza la sección de las tarjetas */}
        <section>
          <header className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-wider">
                Cartelera
              </h1>
              <p className="text-base-content/70 mt-1 font-medium text-sm">
                ESTÁ VIENDO PELÍCULAS DESTACADAS
              </p>
            </div>
          </header>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {mockMovies.map(movie => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default CarteleraPage;