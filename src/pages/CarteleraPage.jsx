import MovieCard from '../components/MovieCard';

// Datos temporales (Mock) para probar el diseño
const mockMovies = [
  { id: 1, title: "SPIDERMAN BRAND NEW DAY", genre: "Ciencia Ficción", duration: "166 min", rating: "+14", image: "https://cdn.cinemark.cl/content/posters/HO00015116.jpg" },
  { id: 2, title: "LA ODISEA", genre: "Acción - Drama", duration: "127 min", rating: "+18", image: "https://cdn.cinemark.cl/content/posters/HO00015098.jpg" },
  { id: 3, title: "LA MUERTE DE ROBBIN HOOD ", genre: "Acción", duration: "96 min", rating: "+18", image: "https://cdn.cinemark.cl/content/posters/HO00015321.jpg" },
  { id: 4, title: "MI VECINO TOTORO 1988", genre: "Animación - Anime", duration: "119 min", rating: "+10", image: "https://cdn.cinemark.cl/content/posters/HO00015252.jpg" },
  { id: 5, title: "LA NOCHE DEL DEMONIO: ESTÁN ENTRE NOSOTROS", genre: "TERROR SUSPENSO", duration: "150 min", rating: "+18", image: "https://cdn.cinemark.cl/content/posters/HO00015308.jpg" },
];

function CarteleraPage() {
  return (
    <main className="min-h-screen bg-base-200 py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Cartelera
          </h1>
          <p className="text-base-content/70 mt-2 font-medium">
            Descubre las mejores películas en exhibición
          </p>
        </header>
        
        {/* Grilla responsiva: 1 columna en celular, 3 en tablet, 5 en PC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockMovies.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default CarteleraPage;