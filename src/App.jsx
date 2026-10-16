import { BrowserRouter } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter basename="/cine-frontend-cliente">
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-gray-950">
          <Navbar />
          <div className="flex-1">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;