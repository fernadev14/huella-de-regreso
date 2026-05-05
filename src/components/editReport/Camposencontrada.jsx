/**
 * CamposEncontrada
 * Campos extra que aparecen solo cuando el reporte es de mascota encontrada.
 */

export function CamposEncontrada({
  foundDate, setFoundDate,
  foundPlaceDetails, setFoundPlaceDetails,
  microchipped, setMicrochipped,
  chipId, setChipId,
}) {
  return (
    <div className="space-y-4 pt-2">
      {/* Fecha de hallazgo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Fecha de hallazgo
        </label>
        <input
          type="date"
          value={foundDate}
          onChange={(e) => setFoundDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
        />
      </div>

      {/* Lugar de hallazgo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Lugar de hallazgo
        </label>
        <input
          type="text"
          value={foundPlaceDetails}
          onChange={(e) => setFoundPlaceDetails(e.target.value)}
          placeholder="ej. Parque El Virrey, cerca de la entrada principal"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
        />
      </div>

      {/* Microchip toggle */}
      <div className="flex items-center gap-3 py-1">
        <button
          type="button"
          onClick={() => setMicrochipped((v) => !v)}
          className={`relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            microchipped ? 'bg-yellow-400' : 'bg-gray-300'
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
          ¿Tiene microchip?
        </label>
      </div>

      {/* ID del microchip */}
      {microchipped && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            ID del Microchip
          </label>
          <input
            type="text"
            value={chipId}
            onChange={(e) => setChipId(e.target.value)}
            placeholder="Número del microchip"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
          />
        </div>
      )}
    </div>
  )
}