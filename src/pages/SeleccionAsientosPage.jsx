import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import SeatMap from '../components/SeatMap';
import { useAuth } from '../context/AuthContext';
import {
  confirmarReserva,
  crearReserva,
  obtenerAsientosOcupados,
} from '../services/reservaService';

// TODO: reemplazar por el precio real de la función cuando provenga del backend.
const PRECIO_UNITARIO_DEFAULT = 5000;

function SeleccionAsientosPage() {
  const { funcionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = useAuth();

  const funcion = location.state?.funcion ?? null;
  const precioUnitario = Number(funcion?.precio ?? PRECIO_UNITARIO_DEFAULT);

  const [asientosOcupados, setAsientosOcupados] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagando, setPagando] = useState(false);
  const [error, setError] = useState(null);

  const cargarAsientos = useCallback(() => {
    return obtenerAsientosOcupados(funcionId)
      .then((ocupados) => {
        setAsientosOcupados(ocupados);
        // Quita de la selección los asientos que dejaron de estar libres.
        setSeleccionados((prev) => prev.filter((asiento) => !ocupados.includes(asiento)));
        setError(null);
      })
      .catch(() => {
        setError('No se pudieron cargar los asientos ocupados. Intenta nuevamente.');
      })
      .finally(() => {
        setCargando(false);
      });
  }, [funcionId]);

  useEffect(() => {
    cargarAsientos();
  }, [cargarAsientos]);

  const toggleAsiento = (codigo) => {
    setSeleccionados((prev) =>
      prev.includes(codigo)
        ? prev.filter((asiento) => asiento !== codigo)
        : [...prev, codigo]
    );
  };

  const total = seleccionados.length * precioUnitario;

  const pagar = async () => {
    if (seleccionados.length === 0) {
      setError('Selecciona al menos un asiento para continuar.');
      return;
    }

    setPagando(true);
    setError(null);

    try {
      const reserva = await crearReserva({
        funcionId,
        asientos: seleccionados,
        precioUnitario,
      });
      const reservaId = reserva?.id ?? reserva?.reservaId ?? reserva;

      await confirmarReserva(reservaId);

      navigate('/compra', {
        replace: true,
        state: { email, asientos: seleccionados, total, funcion, reservaId },
      });
    } catch (err) {
      if (err.status === 409) {
        setError('Algunos asientos ya fueron ocupados por otra persona. Elige otros.');
        setSeleccionados([]);
        await cargarAsientos();
      } else {
        setError('No se pudo completar la reserva. Intenta nuevamente.');
      }
    } finally {
      setPagando(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#111111] text-white py-10 px-4 font-sans">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm mb-6 text-gray-400 hover:text-white"
        >
          ← Volver a los horarios
        </button>

        <header className="mb-8">
          <h1 className="text-2xl font-black uppercase tracking-wider">Elige tus asientos</h1>
          {funcion && (
            <p className="text-sm text-gray-400 mt-1">
              {funcion.cine} · {funcion.hora}hrs · {funcion.formato} · {funcion.idioma}
            </p>
          )}
        </header>

        {error && (
          <div role="alert" className="alert alert-error alert-soft text-sm mb-6">
            <span>{error}</span>
          </div>
        )}

        {cargando ? (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            <SeatMap
              asientosOcupados={asientosOcupados}
              seleccionados={seleccionados}
              onToggle={toggleAsiento}
            />

            <div className="mt-8 flex flex-wrap justify-center gap-5 text-xs text-gray-400">
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-md border border-gray-600 bg-gray-900" />
                Disponible
              </span>
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-md border border-green-400 bg-green-500" />
                Seleccionado
              </span>
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-md border border-gray-800 bg-gray-800" />
                No disponible
              </span>
            </div>

            <aside className="mt-10 rounded-lg border border-gray-800 bg-[#1a1a1a] p-5">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Asientos seleccionados</span>
                <span className="font-semibold text-white">
                  {seleccionados.length > 0 ? seleccionados.join(', ') : '—'}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
                <span>Precio unitario</span>
                <span className="text-white">${precioUnitario.toLocaleString('es-CL')}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-800 pt-4">
                <span className="font-bold uppercase">Total</span>
                <span className="text-2xl font-black text-red-500">
                  ${total.toLocaleString('es-CL')}
                </span>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={pagando}
                  className="btn btn-ghost flex-1"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={pagar}
                  disabled={pagando || seleccionados.length === 0}
                  className="btn btn-primary flex-1"
                >
                  {pagando ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    'Pagar'
                  )}
                </button>
              </div>
            </aside>
          </>
        )}
      </div>
    </main>
  );
}

export default SeleccionAsientosPage;
