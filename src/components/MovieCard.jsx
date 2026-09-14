import { useNavigate } from 'react-router';

const DEFAULT_POSTER = '/default-poster.svg';

const MovieCard = ({ id, titulo, poster, duracion, clasificacion }) => {
  const navigate = useNavigate();

  const imagen = poster?.trim() ? poster : DEFAULT_POSTER;
  const duracionTexto = duracion != null ? `${duracion} min` : null;
  const clasificacionTexto = clasificacion?.trim() || 'S/C';

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden border border-base-300">
      <figure className="relative aspect-[2/3] overflow-hidden">
        <img
          src={imagen}
          alt={`Póster de ${titulo}`}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = DEFAULT_POSTER; }}
        />

        {/* Duración + clasificación: esquina superior izquierda */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {duracionTexto && (
            <span className="badge badge-neutral font-semibold text-xs shadow">
              {duracionTexto}
            </span>
          )}
          <span className="badge badge-primary font-bold text-xs shadow-lg shadow-blue-500/30">
            {clasificacionTexto}
          </span>
        </div>

        {/* Gradiente inferior */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Título + botón: esquina inferior */}
        <div className="absolute inset-x-0 bottom-0 p-3 space-y-2">
          <h2 className="text-sm font-bold uppercase leading-tight text-white line-clamp-2">
            {titulo}
          </h2>
          <button
            onClick={() => navigate(`/pelicula/${id}`)}
            className="btn btn-primary btn-sm w-full"
          >
            Ver horario
          </button>
        </div>
      </figure>
    </div>
  );
};

export default MovieCard;