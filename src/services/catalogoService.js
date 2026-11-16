const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function getJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function obtenerSucursales() {
  return getJson('/sucursales');
}

export function obtenerFunciones() {
  return getJson('/funciones');
}
