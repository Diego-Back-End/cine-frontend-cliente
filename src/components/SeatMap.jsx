import { Fragment } from 'react';

// Disposición visual de la sala. Debe coincidir con el catálogo de
// asientos que maneja ms-reservas.
const FILAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const ASIENTOS_POR_FILA = 12;
const PASILLO_DESPUES_DE = ASIENTOS_POR_FILA / 2;

const SeatMap = ({ asientosOcupados = [], seleccionados = [], onToggle }) => {
  const ocupados = new Set(asientosOcupados);
  const elegidos = new Set(seleccionados);

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="mx-auto w-max space-y-2">
        {/* Pantalla */}
        <div className="mx-auto mb-8 h-2 w-72 max-w-full rounded-full bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

        {FILAS.map((fila) => (
          <div key={fila} className="flex items-center justify-center gap-1.5">
            <span className="w-5 text-center text-xs font-bold text-gray-500">{fila}</span>

            {Array.from({ length: ASIENTOS_POR_FILA }, (_, indice) => indice + 1).map(
              (numero) => {
                const codigo = `${fila}${numero}`;
                const ocupado = ocupados.has(codigo);
                const activo = elegidos.has(codigo);

                return (
                  <Fragment key={codigo}>
                    {numero === PASILLO_DESPUES_DE + 1 && <span className="w-5" />}
                    <button
                      type="button"
                      disabled={ocupado}
                      aria-pressed={activo}
                      aria-label={`Asiento ${codigo}${ocupado ? ' (no disponible)' : ''}`}
                      onClick={() => onToggle?.(codigo)}
                      className={`h-8 w-8 rounded-md border text-xs font-semibold transition-colors ${
                        ocupado
                          ? 'cursor-not-allowed border-gray-800 bg-gray-800 text-gray-600'
                          : activo
                            ? 'border-green-400 bg-green-500 text-black hover:bg-green-400'
                            : 'border-gray-600 bg-gray-900 text-gray-200 hover:border-blue-400 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {numero}
                    </button>
                  </Fragment>
                );
              }
            )}

            <span className="w-5 text-center text-xs font-bold text-gray-500">{fila}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
