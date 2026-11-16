import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getPelicula } from "../services/peliculaService";
import { obtenerFunciones, obtenerSucursales } from "../services/catalogoService";

const DEFAULT_POSTER = "/default-poster.svg";

const DIAS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function fechaKey(fecha) {
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
}

function etiquetaFecha(key, hoyKey) {
  if (key === hoyKey) return "HOY";
  const [anio, mes, dia] = key.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  return `${DIAS[fecha.getDay()]} ${String(dia).padStart(2, "0")}/${MESES[mes - 1]}`;
}

function horaFuncion(fechaHora) {
  return typeof fechaHora === "string" ? fechaHora.slice(11, 16) : "";
}

function DetallePeliculaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null);
  const [funciones, setFunciones] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [filtroFormato, setFiltroFormato] = useState("Todos");
  const [filtroIdioma, setFiltroIdioma] = useState("Todos");
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);

  useEffect(() => {
    let activo = true;

    Promise.all([getPelicula(id), obtenerFunciones(), obtenerSucursales()])
      .then(([peliculaData, funcionesData, sucursalesData]) => {
        if (!activo) return;
        setPelicula(peliculaData);
        setFunciones(Array.isArray(funcionesData) ? funcionesData : []);
        setSucursales(Array.isArray(sucursalesData) ? sucursalesData : []);
      })
      .catch(err => {
        if (activo) setError(err.message);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, [id]);

  const imagen = pelicula?.poster?.trim() ? pelicula.poster : DEFAULT_POSTER;
  const duracion = pelicula?.duracion != null ? `${pelicula.duracion} min` : null;
  const clasificacionTexto = pelicula?.clasificacion?.trim() || "S/C";
  const generos = Array.isArray(pelicula?.generos) ? pelicula.generos : [];

  const funcionesPelicula = funciones
    .filter(funcion => String(funcion.peliculaId) === String(id))
    .sort((a, b) => String(a.fechaHora).localeCompare(String(b.fechaHora)));

  const hoyKey = fechaKey(new Date());
  const fechas = [...new Set(
    funcionesPelicula.map(funcion => funcion.fechaHora.slice(0, 10))
  )].sort();

  const fechaActiva = fechas.includes(fechaSeleccionada) ? fechaSeleccionada : fechas[0] ?? null;

  const funcionesDelDia = fechaActiva
    ? funcionesPelicula.filter(funcion => funcion.fechaHora.slice(0, 10) === fechaActiva)
    : [];

  const formatos = ["Todos", ...new Set(
    funcionesPelicula.map(funcion => funcion.formato).filter(Boolean)
  )];
  const idiomas = ["Todos", ...new Set(
    funcionesPelicula.map(funcion => funcion.idioma).filter(Boolean)
  )];

  const funcionesFiltradas = funcionesDelDia.filter(funcion =>
    (filtroFormato === "Todos" || funcion.formato === filtroFormato) &&
    (filtroIdioma === "Todos" || funcion.idioma === filtroIdioma)
  );

  const sucursalesPorId = new Map(sucursales.map(sucursal => [sucursal.id, sucursal]));
  const gruposPorSucursal = new Map();

  for (const funcion of funcionesFiltradas) {
    if (!gruposPorSucursal.has(funcion.sucursalId)) {
      gruposPorSucursal.set(funcion.sucursalId, []);
    }
    gruposPorSucursal.get(funcion.sucursalId).push(funcion);
  }

  const tarjetas = [...gruposPorSucursal.entries()]
    .map(([sucursalId, funcionesSucursal]) => {
      const sucursal = sucursalesPorId.get(sucursalId);
      return {
        sucursalId,
        nombre: sucursal?.nombre || `Sucursal ${sucursalId}`,
        direccion: sucursal?.direccion || "",
        funciones: funcionesSucursal,
      };
    })
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

  const funcionActual = funcionSeleccionada == null
    ? null
    : (() => {
        const funcion = funcionesPelicula.find(
          item => String(item.id) === String(funcionSeleccionada)
        );
        if (!funcion) return null;

        const sucursal = sucursalesPorId.get(funcion.sucursalId);
        return {
          ...funcion,
          cine: sucursal?.nombre || `Sucursal ${funcion.sucursalId}`,
          direccion: sucursal?.direccion || "",
          hora: horaFuncion(funcion.fechaHora),
        };
      })();

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
            <span>No se pudieron cargar la película y sus horarios: {error}</span>
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

                {funcionesPelicula.length === 0 ? (
                  <p className="text-gray-500 italic text-sm">Sin horarios disponibles</p>
                ) : (
                  <div className="flex border-b border-gray-800 overflow-x-auto">
                    {fechas.map(fecha => (
                      <button
                        key={fecha}
                        onClick={() => setFechaSeleccionada(fecha)}
                        className={`px-5 py-4 text-sm font-bold whitespace-nowrap transition-colors ${
                          fechaActiva === fecha
                            ? 'bg-white text-black'
                            : 'bg-[#1a1a1a] text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        {etiquetaFecha(fecha, hoyKey)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {funcionesPelicula.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-4">
                    <select
                      className="select select-bordered select-sm bg-[#1a1a1a] border-gray-700 text-white w-40"
                      value={filtroFormato}
                      onChange={(e) => setFiltroFormato(e.target.value)}
                    >
                      {formatos.map(formato => (
                        <option key={formato} value={formato}>{formato}</option>
                      ))}
                    </select>

                    <select
                      className="select select-bordered select-sm bg-[#1a1a1a] border-gray-700 text-white w-40"
                      value={filtroIdioma}
                      onChange={(e) => setFiltroIdioma(e.target.value)}
                    >
                      {idiomas.map(idioma => (
                        <option key={idioma} value={idioma}>{idioma}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-6">
                    {tarjetas.length === 0 ? (
                      <p className="text-gray-500 italic text-sm">
                        No hay funciones para los filtros seleccionados.
                      </p>
                    ) : (
                      tarjetas.map(tarjeta => (
                        <div key={tarjeta.sucursalId} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5">
                          <h3 className="text-lg font-bold uppercase text-red-600 mb-1">{tarjeta.nombre}</h3>
                          <p className="text-sm text-gray-400 mb-4">{tarjeta.direccion}</p>

                          <div className="flex flex-wrap gap-3">
                            {tarjeta.funciones.map(funcion => {
                              const seleccionada = String(funcionSeleccionada) === String(funcion.id);
                              return (
                                <button
                                  key={funcion.id}
                                  onClick={() => setFuncionSeleccionada(funcion.id)}
                                  className={`btn btn-outline h-auto py-2 px-4 flex flex-col items-center gap-1 ${
                                    seleccionada
                                      ? 'border-white bg-white text-black hover:bg-white hover:text-black'
                                      : 'border-gray-600 text-white hover:bg-white hover:text-black hover:border-white'
                                  }`}
                                >
                                  <span className="text-lg leading-tight">{horaFuncion(funcion.fechaHora)}hrs</span>
                                  <span className="text-[10px] uppercase text-gray-500">
                                    {funcion.formato} · {funcion.idioma}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {funcionActual && (
                    <div className="sticky bottom-4 flex justify-center pt-2">
                      <button
                        onClick={() =>
                          navigate(`/reserva/${funcionActual.id}`, {
                            state: { funcion: funcionActual },
                          })
                        }
                        className="btn btn-primary shadow-lg shadow-blue-500/30"
                      >
                        Continuar con la reserva · {funcionActual.hora}hrs {funcionActual.formato}
                      </button>
                    </div>
                  )}
                </>
              )}

            </section>
          </div>
        )}
      </div>
    </main>
  );
}

export default DetallePeliculaPage;
