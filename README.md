# CineCloud — Frontend Cliente

Aplicación web para clientes de CineCloud: cartelera, detalle de película, selección de asientos y confirmación de compra.

- **Stack:** React 19 + Vite 8, Tailwind CSS 4 + daisyUI 5, `react-router` 7.
- **Puerto de desarrollo:** `5174`.
- **Ruta base:** `/cine-frontend-cliente/` (debe coincidir con el nombre del repo en GitHub Pages).

## Requisitos

- Node.js 20 o superior y npm.
- El catálogo `ms-catalogo` corriendo en `http://localhost:8081`.
- El servicio de reservas `ms-reservas` para probar el flujo de compra. **No está en este repositorio.**

## Configuración

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear `.env` a partir de la plantilla:

   ```bash
   cp .env.example .env
   ```

   En Windows:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Completar las variables:

   | Variable | Descripción |
   |---|---|
   | `VITE_API_BASE_URL` | URL del catálogo **incluyendo `/api`**, por ejemplo `http://localhost:8081/api`. El servicio le concatena `/peliculas`. |
   | `VITE_RESERVAS_URL` | URL base del servicio de reservas **sin `/api`**, por ejemplo `http://localhost:8082`. El servicio concatena `/api/reservas...`. Si queda vacía, las llamadas van contra el propio origen de Vite y fallan. |

4. Arrancar:

   ```bash
   npm run dev
   ```

   Abrir `http://localhost:5174/cine-frontend-cliente/`.

El backend debe permitir el origen `http://localhost:5174` en su configuración CORS (`SecurityConfig` / `CorsConfig` de `ms-catalogo`).

## Autenticación (simulada)

El login es temporal y no usa contraseña:

- Se pide un correo, se valida el formato y se guarda en `sessionStorage` bajo `cine-cliente-session-email`.
- No se envía ningún token al catálogo.
- Las rutas de reserva y compra están protegidas: sin sesión redirigen a `/login` y vuelven al destino después de ingresar.
- Está marcado como `TODO` reemplazarlo por Amazon Cognito.
- Para `ms-reservas`, la identidad de desarrollo viaja en el header `X-Dev-Email`; sin sesión se usa el `DEV_EMAIL` hardcodeado en `src/services/reservaService.js`.

## Rutas

```
/                    Cartelera
/login               Login simulado por correo
/pelicula/:id        Detalle de película
/reserva/:funcionId  Selección de asientos (requiere sesión)
/compra              Confirmación de compra (requiere sesión)
```

## Servicios

| Archivo | Uso |
|---|---|
| `src/services/peliculaService.js` | `GET /peliculas` y `GET /peliculas/{id}` contra `ms-catalogo` (endpoints públicos, sin token). |
| `src/services/reservaService.js` | Crear/confirmar/cancelar reservas y consultar asientos ocupados en `ms-reservas`. |

## Limitaciones conocidas

- `DetallePeliculaPage` todavía muestra horarios mock (misma estética que la vista del admin, que ya usa funciones reales).
- El flujo de compra depende de que `VITE_RESERVAS_URL` apunte a un `ms-reservas` funcional.
- `npm run lint` no está en verde hoy (24 errores, principalmente variables sin usar y reglas de hooks). Evitá agregar errores nuevos; no bloquea el build.

## Build y despliegue

```bash
npm run build
npm run preview
```

El despliegue a GitHub Pages está en `.github/workflows/deploy.yml` (push a `main` o `develop`) y usa estos secrets:

`VITE_API_BASE_URL`, `VITE_RESERVAS_URL`.

El workflow copia `dist/index.html` a `dist/404.html` para el routing de SPA. `vite.config.js` fija `base: '/cine-frontend-cliente/'`; si el repositorio cambia de nombre, actualizá ese base.
