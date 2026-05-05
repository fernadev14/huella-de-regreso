/**
 * ImageUploader
 * Maneja la vista de imágenes existentes y la carga de nuevas.
 */

export function ImageUploader({
  existingPhotos,
  previews,
  totalPhotos,
  fileInput,
  handleFiles,
  removeExistingPhoto,
  removeNewImage,
  onDragStart,
  onDrop,
  triggerFileInput,
}) {
  return (
    <div className="space-y-6">
      {/* Imágenes actuales */}
      {existingPhotos.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Imágenes actuales
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {existingPhotos.map((url, idx) => (
              <div key={idx} className="relative group aspect-square">
                <img
                  src={url}
                  alt={`foto-${idx}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExistingPhoto(url)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nuevas imágenes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Agregar imágenes{' '}
          <span className="text-gray-400 font-normal">({totalPhotos}/4)</span>
        </label>

        <input
          type="file"
          ref={fileInput}
          onChange={handleFiles}
          multiple
          accept="image/*"
          className="hidden"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {previews.map((url, idx) => (
            <div
              key={idx}
              className="relative group aspect-square"
              draggable
              onDragStart={(e) => onDragStart(e, idx)}
              onDrop={(e) => onDrop(e, idx)}
              onDragOver={(e) => e.preventDefault()}
            >
              <img
                src={url}
                alt={`preview-${idx}`}
                className="w-full h-full object-cover rounded-lg cursor-move"
              />
              <button
                type="button"
                onClick={() => removeNewImage(idx)}
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold"
              >
                ✕
              </button>
              <span className="absolute bottom-1 left-1 bg-black/40 text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                arrastrar
              </span>
            </div>
          ))}

          {totalPhotos < 4 && (
            <button
              type="button"
              onClick={triggerFileInput}
              className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-yellow-400 hover:bg-yellow-50 transition-colors cursor-pointer gap-1"
            >
              <span className="text-2xl text-gray-400">+</span>
              <span className="text-xs text-gray-400">Agregar</span>
            </button>
          )}
        </div>

        {totalPhotos > 0 && previews.length > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            💡 Arrastra las imágenes para reordenarlas
          </p>
        )}
      </div>
    </div>
  )
}