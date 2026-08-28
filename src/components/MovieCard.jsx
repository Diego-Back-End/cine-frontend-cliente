import { useNavigate } from 'react-router';

const MovieCard = ({ title, image, genre, duration, rating, id }) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer overflow-hidden border border-base-300">
      <figure className="relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={`Póster de ${title}`}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {/* Etiqueta de edad arriba a la derecha */}
        <div className="absolute top-3 right-3 badge badge-primary font-bold shadow-lg shadow-blue-500/30">
          {rating}
        </div>
      </figure>
      
      <div className="card-body p-4 gap-2">
        <h2 className="card-title text-lg leading-tight line-clamp-1">{title}</h2>
        <div className="text-sm text-base-content/60 flex justify-between font-medium">
          <span>{genre}</span>
          <span>{duration}</span>
        </div>
        <div className="card-actions justify-end mt-3">
          <button 
            onClick={() => navigate(`/pelicula/${id}`)} // <-- Actualizar el botón
            className="btn btn-primary btn-sm w-full"
          >
            Ver Horarios
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;