/**
 * ImageUploadGrid
 * Grid de upload con drag-to-reorder, preview y remove.
 * Reutilizable tanto en NuevoReporte como en EditarReporte.
 */

export function ImageUploadGrid({
  previews,
  fileInput,
  handleFiles,
  removeImage,
  onDragStart,
  onDrop,
  triggerFileInput,
}) {
  const remaining = 4 - previews.length

  return (
    <div>
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {previews.map((src, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-grab active:cursor-grabbing group border border-gray-200"
            draggable
            onDragStart={(e) => onDragStart(e, idx)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, idx)}
          >
            <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />

            {/* Remove button */}
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 flex items-center justify-center text-xs font-bold shadow transition-colors opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>

            {/* Order badge */}
            <div className="absolute bottom-1.5 left-1.5 bg-black/50 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {idx + 1}
            </div>

            {idx === 0 && (
              <div className="absolute top-1.5 left-1.5 bg-yellow-400 text-gray-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                Portada
              </div>
            )}
          </div>
        ))}

        {/* Add button */}
        {remaining > 0 && (
          <button
            type="button"
            onClick={triggerFileInput}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-yellow-400 hover:bg-yellow-50 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span className="text-2xl text-gray-400">+</span>
            <span className="text-xs text-gray-400">{remaining} restante{remaining !== 1 ? 's' : ''}</span>
          </button>
        )}
      </div>

      {previews.length > 0 && (
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
          <span>💡</span> Arrastra para reordenar · La primera es la portada
        </p>
      )}
    </div>
  )
}