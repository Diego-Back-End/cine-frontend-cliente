import { Link, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

function CompraConfirmacionPage() {
  const location = useLocation();
  const { email } = useAuth();

  const datos = location.state ?? {};
  const correo = datos.email || email;
  const asientos = Array.isArray(datos.asientos) ? datos.asientos : [];
  const total = typeof datos.total === 'number' ? datos.total : null;
  const funcion = datos.funcion ?? null;

  return (
    <main className="min-h-screen bg-[#111111] text-white py-16 px-4 font-sans">
      <div className="container mx-auto max-w-xl">
        <div className="rounded-2xl border border-gray-800 bg-[#1a1a1a] p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-black uppercase tracking-wider">Reserva confirmada</h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Enviaremos el detalle de tu compra a{' '}
            <span className="font-semibold text-white">{correo}</span>.
          </p>

          {funcion && (
            <p className="mt-4 text-sm text-gray-400">
              {funcion.cine} · {funcion.hora}hrs · {funcion.formato} · {funcion.idioma}
            </p>
          )}

          {asientos.length > 0 && (
            <div className="mt-6 space-y-2 text-left text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Asientos</span>
                <span className="font-semibold text-white">{asientos.join(', ')}</span>
              </div>
              {total != null && (
                <div className="flex justify-between text-gray-400">
                  <span>Total pagado</span>
                  <span className="font-semibold text-white">
                    ${total.toLocaleString('es-CL')}
                  </span>
                </div>
              )}
            </div>
          )}

          <Link to="/" className="btn btn-primary btn-block mt-8">
            Volver a la cartelera
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CompraConfirmacionPage;
