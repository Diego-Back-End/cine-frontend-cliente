import { Routes, Route } from 'react-router';
import LoginPageClient from '../pages/LoginPageClient'; 

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta principal (Cartelera) */}
      <Route path="/" element={
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-3xl">
          Cartelera en construcción
        </div>
      } />
      
      {/* Ruta del Login */}
      <Route path="/login" element={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <LoginPageClient />
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;