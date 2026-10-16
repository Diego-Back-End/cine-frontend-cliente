import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: Login SIMULADO y TEMPORAL para clientes.
// TODO: Reemplazar por autenticación real con Amazon Cognito.
function LoginPageClient() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const correo = email.trim();

    if (!correo) {
      setError('Ingresa tu correo electrónico.');
      return;
    }

    if (!EMAIL_REGEX.test(correo)) {
      setError('El formato del correo no es válido.');
      return;
    }

    login(correo);

    const from = location.state?.from;
    const destino = from ? `${from.pathname}${from.search ?? ''}` : '/';
    navigate(destino, { replace: true });
  };

  return (
    <main className="hero min-h-screen bg-base-200">
      <section className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body gap-6">
          <header className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Ingresa a tu cuenta</h1>
            <p className="text-sm text-base-content/60">
              Ingresa tu correo para gestionar tus reservas.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Correo electrónico</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="correo@cliente.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </fieldset>

            {error && (
              <div role="alert" className="alert alert-error alert-soft text-sm">
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
              Ingresar
            </button>
          </form>

          <div className="space-y-3 pt-2 text-center text-sm border-t border-base-300">
            <p className="text-xs text-base-content/50">
              Acceso simulado temporal. No se solicita contraseña.
            </p>
            <div>
              <Link
                to="/"
                className="text-xs text-base-content/60 hover:text-base-content transition-colors"
              >
                Seguir como invitado →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPageClient;
