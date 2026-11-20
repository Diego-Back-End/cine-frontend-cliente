import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { cancelarReserva, confirmarReserva } from '../services/reservaService';

function PagoSimuladoPage() {
  const { reservaId: reservaIdParam } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { email: authEmail } = useAuth();

  const datos = location.state ?? {};
  const reservaId = datos.reservaId ?? reservaIdParam;
  const funcion = datos.funcion ?? null;
  const asientos = Array.isArray(datos.asientos) ? datos.asientos : [];
  const total = typeof datos.total === 'number' ? datos.total : null;
  const email = datos.email || authEmail;

  const [tarjeta, setTarjeta] = useState({
    numero: '',
    vencimiento: '',
    cvv: '',
    nombre: '',
  });
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!reservaId) navigate('/', { replace: true });
  }, [reservaId, navigate]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const actualizarCampo = (campo) => (evento) => {
    setTarjeta((prev) => ({ ...prev, [campo]: evento.target.value }));
  };

  const pagar = async () => {
    setProcesando(true);
    setError(null);

    try {
      await confirmarReserva(reservaId);
      navigate('/compra', {
        replace: true,
        state: { email, asientos, total, funcion, reservaId },
      });
    } catch {
      setError('No se pudo confirmar la compra. Intenta nuevamente.');
    } finally {
      setProcesando(false);
    }
  };

  const cancelarCompra = async () => {
    setProcesando(true);
    setError(null);

    try {
      await cancelarReserva(reservaId);
      setMensaje('Compra cancelada. Te enviamos un correo con el detalle.');
      timerRef.current = setTimeout(() => navigate('/', { replace: true }), 2200);
    } catch {
      setError('No se pudo cancelar la compra. Intenta nuevamente.');
    } finally {
      setProcesando(false);
    }
  };

  if (!reservaId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] text-white">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111111] text-white py-10 px-4 font-sans">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-2xl font-black uppercase tracking-wider">Pago simulado</h1>
          <p className="mt-1 text-sm text-gray-400">Reserva #{reservaId}</p>
        </header>

        {error && (
          <div role="alert" className="alert alert-error alert-soft text-sm mb-6">
            <span>{error}</span>
          </div>
        )}

        {mensaje && (
          <div role="status" className="alert alert-success alert-soft text-sm mb-6">
            <span>{mensaje}</span>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <aside className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-5">
            <h2 className="mb-4 text-lg font-bold uppercase">Resumen de la compra</h2>
            {funcion && (
              <p className="mb-4 text-sm text-gray-400">
                {funcion.cine} · {funcion.hora}hrs · {funcion.formato} · {funcion.idioma}
              </p>
            )}
            <div className="flex justify-between text-sm text-gray-400">
              <span>Asientos</span>
              <span className="font-semibold text-white">
                {asientos.length > 0 ? asientos.join(', ') : '—'}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-400">
              <span>Correo</span>
              <span className="font-semibold text-white">{email || '—'}</span>
            </div>
            <div className="mt-4 flex justify-between border-t border-gray-800 pt-4">
              <span className="font-bold uppercase">Total</span>
              <span className="text-2xl font-black text-red-500">
                ${total != null ? total.toLocaleString('es-CL') : '—'}
              </span>
            </div>
          </aside>

          <form
            onSubmit={(evento) => {
              evento.preventDefault();
              pagar();
            }}
            className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-5"
          >
            <h2 className="mb-4 text-lg font-bold uppercase">Datos de la tarjeta</h2>

            <div className="alert alert-info alert-soft mb-5 text-xs">
              <span>Pago simulado: no se procesa ni se guarda ningún dato de tarjeta</span>
            </div>

            <label className="form-control mb-4">
              <span className="label-text mb-1 text-sm text-gray-400">Número de tarjeta</span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={tarjeta.numero}
                onChange={actualizarCampo('numero')}
                placeholder="0000 0000 0000 0000"
                className="input input-bordered w-full"
              />
            </label>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <label className="form-control">
                <span className="label-text mb-1 text-sm text-gray-400">Vencimiento</span>
                <input
                  type="text"
                  autoComplete="off"
                  value={tarjeta.vencimiento}
                  onChange={actualizarCampo('vencimiento')}
                  placeholder="MM/AA"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control">
                <span className="label-text mb-1 text-sm text-gray-400">CVV</span>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={tarjeta.cvv}
                  onChange={actualizarCampo('cvv')}
                  placeholder="123"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <label className="form-control mb-6">
              <span className="label-text mb-1 text-sm text-gray-400">Nombre en la tarjeta</span>
              <input
                type="text"
                autoComplete="off"
                value={tarjeta.nombre}
                onChange={actualizarCampo('nombre')}
                placeholder="Nombre completo"
                className="input input-bordered w-full"
              />
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={cancelarCompra}
                disabled={procesando || Boolean(mensaje)}
                className="btn btn-ghost flex-1"
              >
                Cancelar compra
              </button>
              <button
                type="submit"
                disabled={procesando || Boolean(mensaje)}
                className="btn btn-primary flex-1"
              >
                {procesando ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Pagar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default PagoSimuladoPage;
