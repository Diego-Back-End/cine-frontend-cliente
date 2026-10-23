import { SESSION_EMAIL_KEY } from '../context/AuthContext';

const RESERVAS_URL = import.meta.env.VITE_RESERVAS_URL;

// Email de desarrollo: ms-reservas identifica al cliente con este header
// cuando corre con el perfil "dev". Se usa si no hay sesión iniciada.
export const DEV_EMAIL = 'diegoescobedoambrosetti@gmail.com';

function getSessionEmail() {
  return sessionStorage.getItem(SESSION_EMAIL_KEY) || DEV_EMAIL;
}

async function parseBody(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${RESERVAS_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Header temporal de desarrollo: identifica al cliente en ms-reservas.
      'X-Dev-Email': getSessionEmail(),
      ...options.headers,
    },
  });

  const data = await parseBody(response);

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      `Error en la solicitud: ${response.status} ${response.statusText}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function extraerEtiquetaAsiento(asiento) {
  if (typeof asiento === 'string') return asiento;
  if (asiento && typeof asiento === 'object') {
    return (
      asiento.asiento ??
      asiento.codigo ??
      asiento.seat ??
      asiento.label ??
      String(asiento.id ?? '')
    );
  }
  return String(asiento);
}

export function crearReserva({ funcionId, asientos, precioUnitario }) {
  return request('/api/reservas', {
    method: 'POST',
    body: JSON.stringify({ funcionId, asientos, precioUnitario }),
  });
}

export function confirmarReserva(id) {
  return request(`/api/reservas/${id}/confirmar`, { method: 'PUT' });
}

export function cancelarReserva(id) {
  return request(`/api/reservas/${id}/cancelar`, { method: 'PUT' });
}

export async function obtenerMisReservas() {
  const data = await request('/api/reservas/mis-reservas');

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.reservas)) return data.reservas;
  if (Array.isArray(data?.content)) return data.content;
  return [];
}

export async function obtenerAsientosOcupados(funcionId) {
  const data = await request(`/api/reservas/funcion/${funcionId}/asientos-ocupados`);

  const lista = Array.isArray(data)
    ? data
    : Array.isArray(data?.asientos)
      ? data.asientos
      : [];

  return lista.map(extraerEtiquetaAsiento).filter(Boolean);
}
