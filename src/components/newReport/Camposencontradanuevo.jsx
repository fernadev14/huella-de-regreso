/**
 * CamposEncontradaNuevo
 * Campos extra que aparecen cuando el reporte es de mascota encontrada.
 * (Para NuevoReporte — incluye fecha al inicio del form también,
 *  aquí van los campos adicionales del bloque inferior)
 */

const inputCls = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-white'

export function CamposEncontradaNuevo({
  foundPlaceDetails, setFoundPlaceDetails,
  microchipped,      setMicrochipped,
  chipId,            setChipId,
}) {
  return (
    <div className="space-y-4">
      {/* Lugar de hallazgo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Lugar aproximado donde se encontró
        </label>
        <input
          type="text"
          value={foundPlaceDetails}
          onChange={(e) => setFoundPlaceDetails(e.target.value)}
          placeholder="Ej: Parque central, cerca a la entrada norte"
          className={inputCls}
        />
      </div>

      {/* Microchip toggle */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMicrochipped((v) => !v)}
            className={`relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 shrink-0 ${
              microchipped ? 'bg-yellow-400' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                microchipped ? 'translate-x-0.5' : '-translate-x-4'
              }`}
            />
          </button>
          <label
            className="text-sm font-semibold text-gray-700 cursor-pointer select-none"
            onClick={() => setMicrochipped((v) => !v)}
          >
            ¿La mascota tiene microchip?
          </label>
        </div>

        {microchipped && (
          <input
            type="text"
            value={chipId}
            onChange={(e) => setChipId(e.target.value)}
            placeholder="Número de microchip (si aplica)"
            className={inputCls}
          />
        )}
      </div>
    </div>
  )
}