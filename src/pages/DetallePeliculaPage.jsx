import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getPelicula } from "../services/peliculaService";

const DEFAULT_POSTER = "/default-poster.svg";

function DetallePeliculaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    getPelicula(id)
      .then(data => { if (activo) setPelicula(data); })
      .catch(err => { if (activo) setError(err.message); })
      .finally(() => { if (activo) setCargando(false); });

    return () => { activo = false; };
  }, [id]);

  const imagen = pelicula?.poster?.trim() ? pelicula.poster : DEFAULT_POSTER;
  const duracion = pelicula?.duracion != null ? `${pelicula.duracion} min` : null;
  const clasificacionTexto = pelicula?.clasificacion?.trim() || "S/C";
  const generos = Array.isArray(pelicula?.generos) ? pelicula.generos : [];

  return (
    <main className="min-h-screen bg-[#111111] text-white py-10 px-4 font-sans">
      <div className="container mx-auto max-w-6xl">

        <button
          onClick={() => navigate('/')}
          className="btn btn-ghost btn-sm mb-6 text-gray-400 hover:text-white"
        >
          ← Volver a la cartelera
        </button>

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
            <span>No se pudo cargar la película: {error}</span>
          </div>
        )}

        {!cargando && !error && !pelicula && (
          <p className="text-center py-16 text-gray-400">No se encontró la película.</p>
        )}

        {!cargando && !error && pelicula && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">

            <section className="space-y-6">
              <h1 className="text-3xl font-black uppercase tracking-wider">{pelicula.titulo}</h1>

              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={imagen}
                  alt={pelicula.titulo}
                  className="w-full object-cover aspect-[2/3]"
                  onError={(e) => { e.target.src = DEFAULT_POSTER; }}
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {generos.map((genero, index) => (
                  <span key={`${genero}-${index}`} className="badge badge-outline border-gray-600 text-gray-300">
                    {genero}
                  </span>
                ))}
                {duracion && (
                  <span className="badge badge-outline border-gray-600 text-gray-300">{duracion}</span>
                )}
                <span className="badge badge-outline border-gray-600 text-gray-300 font-bold">
                  {clasificacionTexto}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Sinopsis</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{pelicula.sinopsis}</p>
              </div>
            </section>

            <section className="space-y-8 lg:pt-14">
              <h2 className="text-2xl font-bold uppercase mb-4">Horarios</h2>
              <p className="text-gray-400 italic">Los horarios estarán disponibles próximamente.</p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default DetallePeliculaPage;