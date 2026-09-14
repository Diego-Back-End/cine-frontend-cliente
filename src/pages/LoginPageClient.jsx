import { useState } from 'react'
import { useNavigate, Link } from 'react-router'

function LoginPageClient() {
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    
    if (isRegistering) {
      if (!name || !email || !password) {
        setError('Por favor, completa todos los campos para crear tu cuenta.')
        return
      }
      // Lógica de registro futuro
      navigate('/')
    } else {
      if (!email || !password) {
        setError('Por favor, ingresa tu correo y contraseña.')
        return
      }
      // Lógica de login futuro
      navigate('/')
    }
  }

  return (
    <main className="hero min-h-screen bg-base-200">
      <section className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body gap-6">
          <header className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              {isRegistering ? 'Crea una cuenta' : 'Inicio de sesión'}
            </h1>
            <p className="text-sm text-base-content/60">
              {isRegistering 
                ? 'Regístrate para gestionar tus entradas y reservas' 
                : 'Inicia sesión para ver tu historial de reservas'}
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Nombre completo</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Juan Pérez"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegistering}
                />
              </fieldset>
            )}

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

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Contraseña</legend>
              <input
                type="password"
                className="input w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isRegistering ? "new-password" : "current-password"}
                required
              />
            </fieldset>

            {error && (
              <div role="alert" className="alert alert-error alert-soft text-sm">
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
              {isRegistering ? 'Registrarse' : 'Iniciar sesión'}
            </button>
          </form>

          {/* Opciones adicionales: Cambiar modo e Continuar como invitado */}
          <div className="space-y-3 pt-2 text-center text-sm border-t border-base-300">
            <p>
              {isRegistering ? '¿Ya tienes una cuenta? ' : '¿No tienes cuenta? '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering)
                  setError('')
                }}
                className="link link-primary font-semibold"
              >
                {isRegistering ? 'Inicia sesión aquí' : 'Crea una cuenta aquí'}
              </button>
            </p>

            <div>
              <Link to="/" className="text-xs text-base-content/60 hover:text-base-content transition-colors">
                Seguir como invitado →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPageClient