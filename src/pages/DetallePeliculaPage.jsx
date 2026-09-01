import { useState } from "react"
import { useParams, useNavigate } from "react-router"

const mockDetalles = [
    {
        id: 1,
        title: "SPIDERMAN BRAND NEW DAY",
        genre: "CIENCIA FICCION",
        duration: "166 min",
        rating: "+14",
        image: "https://cdn.cinemark.cl/content/posters/HO00015116.jpg",
        synopsis: "Han pasado cuatro años desde los acontecimientos de No Way Home, y Peter es ahora un adulto que vive completamente solo, habiéndose borrado voluntariamente de las vidas y recuerdos de aquellos a quienes ama. Lucha contra el crimen en un Nueva York que ya no conoce su nombre, se ha dedicado por completo a proteger su ciudad -un Spider-Man de tiempo completo- pero a medida que las exigencias sobre él se intensifican, la presión desata una sorprendente evolución física que amenaza su existencia, aun cuando un nuevo y extraño patrón de crímenes da lugar a una de las amenazas más poderosas que jamás haya enfrentado.",
    },
    {
        id: 2,
        title: "LA ODISEA",
        genre: "DRAMA - ACCIÓN",
        duration: "127 min",
        rating: "+18",
        image: "https://cdn.cinemark.cl/content/posters/HO00015111.jpg",
        synopsis: "La siguiente película de Christopher Nolan, La Odisea, es una película de acción épica filmada alrededor del mundo usando nueva tecnología IMAX®. La película lleva la saga fundamental de Homero a las pantallas IMAX® por primera vez y estrena en cines en julio de 2026.",
    },
    {
        id: 3,
        title: "LA MUERTE DE ROBIN HOOD",
        genre: "ACCIÓN",
        duration: "96 min",
        rating: "+18",
        image: "https://cdn.cinemark.cl/content/posters/HO00015321.jpg",
        synopsis: "Robin Hood (Hugh Jackman) intenta lidiar con sus demonios tras una larga vida de crímenes y asesinatos. Cuando en una sangrienta batalla resulta herido de gravedad, es enviado a un misterioso castillo para que curen sus heridas. Allí conocerá a una mujer que le ofrecerá una última oportunidad de redención.",
    },
    {
        id: 4,
        title: "MI VECINO TOTORO",
        genre: "ANIMACIÓN - ANIME",
        duration: "119 min",
        rating: "+10",
        image: "https://cdn.cinemark.cl/content/posters/HO00015252.jpg",
        synopsis: "Cuando las hermanas Satsuki y Mei se mudan al campo junto a su padre para estar más cerca de su madre enferma, descubren un mundo mágico oculto entre los bosques. Allí conocen a Totoro, un misterioso y amable espíritu de la naturaleza que las acompañará en una inolvidable aventura llena de imaginación, amistad y asombro..",
    },
    {
        id: 5,
        title: "LA NOCHE DEL DEMONIO: ESTÁN ENTRE NOSOTROS",
        genre: "TERROR - SUSPENSO",
        duration: "150 min",
        rating: "+12",
        image: "https://cdn.cinemark.cl/content/posters/HO00015308.jpg",
        synopsis: "Gemma, una joven madre que cría a su hija en la casa en la que creció, descubre que puede viajar a The Further, donde posee la capacidad de traer lo que allí vive de vuelta al mundo real.",
    },
];

const mockFechas = ["HOY", "VIE 28/AGO", "SAB 29/AGO", "DOM 30/AGO", "LUN 31/AGO"];

const mockFunciones = [
    {id: 101, hora: "14:15hrs", formato: "2D", idioma: "doblada"},
    {id: 102, hora: "16:30hrs", formato: "2D", idioma: "doblada"},
    {id: 103, hora: "18:45hrs", formato: "2D", idioma: "doblada"},
    {id: 104, hora: "21:00hrs", formato: "IMAX", idioma: "subtitulada"},
];

function DetallePeliculaPage() {
    const { id } = useParams(); //para obtener el id de la url
    const navigate = useNavigate();

    const [fechaSeleccionada, setFechaSeleccionada] = useState("HOY");
    const [filtroFormato, setFiltroFormato] = useState("Todos");
    const [filtroIdioma, setFiltroIdioma] = useState("Todos");

    // Buscar la película en el mockDetalles usando el ID de la URL
    const mockMovie = mockDetalles.find(movie => String(movie.id) === String(id));


    //filtramos las funciones basados en los selectores
    const funcionesFiltradas = mockFunciones.filter(funcion => {
        return (filtroFormato === "Todos" || funcion.formato === filtroFormato) && 
               (filtroIdioma === "Todos" || funcion.idioma === filtroIdioma);
    });


    // Si no se encuentra la película, mostrar mensaje de error
    if (!mockMovie) {
        return (
            <main className="min-h-screen bg-[#111111] text-white py-10 px-4 font-sans">
                <div className="container mx-auto max-w-6xl">
                    <button 
                        onClick={() => navigate('/')}
                        className="btn btn-ghost btn-sm mb-6 text-gray-400 hover:text-white"
                    >
                        ← Volver a la cartelera
                    </button>
                    <div className="text-center py-20">
                        <h1 className="text-4xl font-bold text-red-600 mb-4">Película no encontrada</h1>
                        <p className="text-gray-400">La película con ID {id} no existe en nuestra base de datos.</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
    <main className="min-h-screen bg-[#111111] text-white py-10 px-4 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* Botón de volver */}
        <button 
          onClick={() => navigate('/')}
          className="btn btn-ghost btn-sm mb-6 text-gray-400 hover:text-white"
        >
          ← Volver a la cartelera
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
          
          {/* Columna Izquierda: Póster y Detalles */}
          <section className="space-y-6">
            <h1 className="text-3xl font-black uppercase tracking-wider">{mockMovie.title}</h1>
            
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={mockMovie.image} 
                alt={mockMovie.title} 
                className="w-full object-cover aspect-[2/3]"
              />
              {/* Botón Play falso superpuesto */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                 <button className="btn btn-circle btn-error btn-lg">▶</button>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <span className="badge badge-outline border-gray-600 text-gray-300">☺ {mockMovie.genre.split(',')[0]}</span>
              <span className="badge badge-outline border-gray-600 text-gray-300">{mockMovie.duration}</span>
              <span className="badge badge-outline border-gray-600 text-gray-300 font-bold">{mockMovie.rating}</span>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Sinopsis</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{mockMovie.synopsis}</p>
            </div>
          </section>

          {/* Columna Derecha: Horarios y Filtros */}
          <section className="space-y-8 lg:pt-14">
            
            <div>
              <h2 className="text-2xl font-bold uppercase mb-4">Horarios</h2>
              
              {/* Selector de Fechas (estilo pestañas) */}
              <div className="flex border-b border-gray-800 overflow-x-auto hide-scrollbar">
                {mockFechas.map(fecha => (
                  <button
                    key={fecha}
                    onClick={() => setFechaSeleccionada(fecha)}
                    className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors ${
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

            {/* Filtros de Formato e Idioma */}
            <div className="flex gap-4">
              <select 
                className="select select-bordered select-sm bg-[#1a1a1a] border-gray-700 text-white w-32"
                value={filtroFormato}
                onChange={(e) => setFiltroFormato(e.target.value)}
              >
                <option value="Todos">Formatos</option>
                <option value="2D">2D</option>
                <option value="IMAX">IMAX</option>
              </select>
              
              <select 
                className="select select-bordered select-sm bg-[#1a1a1a] border-gray-700 text-white w-32"
                value={filtroIdioma}
                onChange={(e) => setFiltroIdioma(e.target.value)}
              >
                <option value="Todos">Idioma</option>
                <option value="Doblada">Doblada</option>
                <option value="Subtitulada">Subtitulada</option>
              </select>
            </div>

            {/* Leyenda de Butacas */}
            <div className="flex gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Alta</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> Media</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Baja</span>
            </div>

            {/* Lista de Funciones Disponibles */}
            <div>
              <h3 className="text-xl font-bold uppercase text-red-600 mb-2">Cine Principal</h3>
              <p className="text-sm text-gray-400 mb-4">Dirección: Av. Ficticia 123, Ciudad</p>
              
              <div className="space-y-6">
                {/* Agrupamos por formato/idioma temporalmente para mostrar cómo se vería */}
                <div>
                  <h4 className="font-bold text-sm mb-3">Opciones disponibles:</h4>
                  <div className="flex flex-wrap gap-3">
                    {funcionesFiltradas.map(funcion => (
                      <button 
                        key={funcion.id}
                        className="btn btn-outline border-gray-600 text-white hover:bg-white hover:text-black hover:border-white h-auto py-2 px-4 flex flex-col items-center gap-1"
                      >
                        <span className="text-lg">{funcion.hora}</span>
                        <span className="text-[10px] uppercase text-gray-400">{funcion.formato} - {funcion.idioma.substring(0,3)}</span>
                      </button>
                    ))}
                    {funcionesFiltradas.length === 0 && (
                      <p className="text-gray-500 italic">No hay funciones para los filtros seleccionados.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </main>
  );
}

export default DetallePeliculaPage;
     

