import { useState } from 'react'
import { useNavigate } from 'react-router'

function LoginPageClient() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    
    // Simulación temporal de login para que no explote
    if (email && password) {
      navigate('/') // Te devuelve a la cartelera si "inicias sesión"
    } else {
      setError('Por favor, ingresa tu correo y contraseña.')
    }
  }

  return (
    <main className="hero min-h-screen bg-base-200">
      <section className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body gap-8">
          <header className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Portal Clientes</h1>
          </header>
          <form onSubmit={handleSubmit} className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Correo electrónico</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="correo@cliente.cl"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </fieldset>
            {error && (
              <div role="alert" className="alert alert-error alert-soft text-sm">
                <span>{error}</span>
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full">
              Iniciar sesión
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default LoginPageClient