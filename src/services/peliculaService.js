const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getPeliculas() {
  try {
    const response = await fetch(`${API_BASE_URL}/peliculas`);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('No se pudieron obtener las películas:', error);
    throw error;
  }
}

export async function getPelicula(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/peliculas/${id}`);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`No se pudo obtener la película ${id}:`, error);
    throw error;
  }
}