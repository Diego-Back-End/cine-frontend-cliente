import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Lado izquierdo: Logo con degradado */}
        <Link 
          to="/" 
          className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-80 transition-opacity tracking-wide"
        >
            CineApp
        </Link>
        
        {/* Centro: Enlaces de navegación (Se ocultan en celulares pequeños) */}
        <div className="hidden md:flex space-x-8 text-gray-400 font-medium text-sm">
          <Link to="/" className="hover:text-white transition-colors duration-300">CARTELERA</Link>
          <a href="#" className="hover:text-white transition-colors duration-300">PRÓXIMOS ESTRENOS</a>
          <a href="#" className="hover:text-white transition-colors duration-300">PROMOCIONES</a>
        </div>

        {/* Lado derecho: Botón de Login con efecto Glow */}
        <Link 
          to="/login" 
          className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
        >
          Iniciar Sesión
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;