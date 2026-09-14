import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getPelicula } from "../services/peliculaService";

const DEFAULT_POSTER = "/default-poster.svg";

// --- MOCK DATA TEMPORAL (solo frontend; no toca backend ni BD) ---
const mockFechas = ["HOY", "MAR 15/SEP", "MIÉ 16/SEP", "JUE 17/SEP"];

const mockCines = [
  {
    id: 1,
    nombre: "CineCloud Center",
    direccion: "Av. Providencia 1234, Santiago",
    funciones: [
      { id: 101, hora: "14:50", formato: "2D + DBOX", idioma: "Doblada", disponibilidad: "Alta" },
      { id: 102, hora: "17:30", formato: "2D + DBOX", idioma: "Doblada", disponibilidad: "Alta" },
      { id: 103, hora: "20:15", formato: "IMAX", idioma: "Subtitulada", disponibilidad: "Media" },
      { id: 104, hora: "22:30", formato: "2D", idioma: "Subtitulada", disponibilidad: "Baja" },
      { id: 105, hora: "23:50", formato: "IMAX", idioma: "Doblada", disponibilidad: "Lleno" },
    ],
  },
  {
    id: 2,
    nombre: "CineCloud Norte",
    direccion: "Av. La Florida 2560, Santiago",
    funciones: [
      { id: 201, hora: "15:20", formato: "2D", idioma: "Doblada", disponibilidad: "Alta" },
      { id: 202, hora: "18:00", formato: "3D", idioma: "Doblada", disponibilidad: "Media" },
      { id: 203, hora: "21:10", formato: "IMAX", idioma: "Subtitulada", disponibilidad: "Baja" },
      { id: 204, hora: "19:45", formato: "2D + DBOX", idioma: "Subtitulada", disponibilidad: "Lleno" },
    ],
  },
];

const formatosMock = ["Todos", ...new Set(mockCines.flatMap(cine => cine.funciones.map(f => f.formato)))];
const idiomasMock = ["Todos", ...new Set(mockCines.flatMap(cine => cine.funciones.map(f => f.idioma)))];

const disponibilidadEstilos = {
  Alta: "bg-green-500",
  Media: "bg-yellow-500",
  Baja: "bg-red-500",
  Lleno: "bg-gray-600",
};
// -----------------------------------------------------------------

function DetallePeliculaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [fechaSeleccionada, setFechaSeleccionada] = useState("HOY");
  const [filtroFormato, setFiltroFormato] = useState("Todos");
  const [filtroIdioma, setFiltroIdioma] = useState("Todos");
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);

  useEffect(() => {
    let activo = true;

    getPelicula(id)
      .then(data => { if (activo) setPelicula(data); })
      .catch(err => { if (activo) setError(err.message); })
      .finally(() => { if (activo) setCargando(false); });

    return () => { activo = false; };
  }, [id]);

  const filtrarFunciones = (funciones) => funciones.filter(funcion =>
    (filtroFormato === "Todos" || funcion.formato === filtroFormato) &&
    (filtroIdioma === "Todos" || funcion.idioma === filtroIdioma)
  );

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

              <div>
                <h2 className="text-2xl font-bold uppercase mb-4">Horarios</h2>

                {/* Selector de fechas */}
                <div className="flex border-b border-gray-800 overflow-x-auto">
                  {mockFechas.map(fecha => (
                    <button
                      key={fecha}
                      onClick={() => setFechaSeleccionada(fecha)}
                      className={`px-5 py-4 text-sm font-bold whitespace-nowrap transition-colors ${
                        fechaSeleccionada === fecha
                          ? 'bg-white text-black'
                          : 'bg-[#1a1a1a] text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      {fecha}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros de formato e idioma */}
              <div className="flex flex-wrap gap-4">
                <select
                  className="select select-bordered select-sm bg-[#1a1a1a] border-gray-700 text-white w-40"
                  value={filtroFormato}
                  onChange={(e) => setFiltroFormato(e.target.value)}
                >
                  {formatosMock.map(formato => (
                    <option key={formato} value={formato}>{formato}</option>
                  ))}
                </select>

                <select
                  className="select select-bordered select-sm bg-[#1a1a1a] border-gray-700 text-white w-40"
                  value={filtroIdioma}
                  onChange={(e) => setFiltroIdioma(e.target.value)}
                >
                  {idiomasMock.map(idioma => (
                    <option key={idioma} value={idioma}>{idioma}</option>
                  ))}
                </select>
              </div>

              {/* Leyenda de disponibilidad de butacas */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div> Alta
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> Media
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div> Baja
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-gray-600 rounded-sm"></div> Lleno
                </span>
              </div>

              {/* Tarjetas de cines con funciones */}
              <div className="space-y-6">
                {mockCines.map(cine => {
                  const funciones = filtrarFunciones(cine.funciones);
                  return (
                    <div key={cine.id} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
                      <h3 className="text-lg font-bold uppercase text-red-600 mb-1">{cine.nombre}</h3>
                      <p className="text-sm text-gray-400 mb-4">{cine.direccion}</p>

                      {funciones.length === 0 ? (
                        <p className="text-gray-500 italic text-sm">
                          No hay funciones para los filtros seleccionados.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-3">
                          {funciones.map(funcion => {
                            const lleno = funcion.disponibilidad === "Lleno";
                            const seleccionada = funcionSeleccionada === funcion.id;
                            return (
                              <button
                                key={funcion.id}
                                onClick={() => setFuncionSeleccionada(lleno ? null : funcion.id)}
                                disabled={lleno}
                                className={`btn btn-outline h-auto py-2 px-4 flex flex-col items-center gap-1 ${
                                  lleno
                                    ? 'border-gray-700 text-gray-600 opacity-60 cursor-not-allowed'
                                    : seleccionada
                                      ? 'border-white bg-white text-black hover:bg-white hover:text-black'
                                      : 'border-gray-600 text-white hover:bg-white hover:text-black hover:border-white'
                                }`}
                              >
                                <span className="text-lg leading-tight">{funcion.hora}hrs</span>
                                <span className="text-[10px] uppercase text-gray-500">
                                  {funcion.formato} · {funcion.idioma}
                                </span>
                                <span className={`w-2 h-2 rounded-full ${disponibilidadEstilos[funcion.disponibilidad]}`}></span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default DetallePeliculaPage;