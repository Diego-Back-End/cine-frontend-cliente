import { useState, useEffect } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import MovieCard from '../components/MovieCard';
import { getPeliculas } from '../services/peliculaService';

function CarteleraPage() {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPeliculas()
      .then(data => setPeliculas(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  return (
    <main className="min-h-screen bg-base-200 py-6 px-4">
      <div className="container mx-auto max-w-7xl space-y-10">

        <section>
          <HeroCarousel />
        </section>

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

          {cargando && (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          )}

          {error && (
            <div className="alert alert-error" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No se pudieron cargar las películas: {error}</span>
            </div>
          )}

          {!cargando && !error && peliculas.length === 0 && (
            <p className="text-center py-16 text-base-content/60">
              No hay películas disponibles por ahora.
            </p>
          )}

          {!cargando && !error && peliculas.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {peliculas.map(pelicula => (
                <MovieCard key={pelicula.id} {...pelicula} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default CarteleraPage;