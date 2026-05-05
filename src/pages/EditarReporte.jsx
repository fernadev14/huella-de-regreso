import { useEditarReporte }   from '../components/editReport/Useeditarreporte'
import { ImageUploader }      from '../components/editReport/ImageUploader'
import { CamposEncontrada }   from '../components/editReport/Camposencontrada'

// ── Helpers de estilo reutilizables ────────────────────────────────────────────
const inputCls =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition'

const selectCls =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition'

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}

// ── Pantallas de estado ────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 text-sm">Cargando reporte...</p>
      </div>
    </div>
  )
}

function ErrorScreen({ message }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-2">
        <p className="text-2xl">🚫</p>
        <p className="text-red-600 font-medium">{message}</p>
      </div>
    </div>
  )
}

function UnauthScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-gray-600">Debes iniciar sesión para continuar.</p>
    </div>
  )
}

// ── Componente principal ───────────────────────────────────────────────────────
const EditarReporte = () => {
  const {
    // form
    name, setName,
    department, setDepartment,
    city, setCity,
    barrio, setBarrio,
    estado, setEstado,
    description, setDescription,
    contact, setContact,
    foundDate, setFoundDate,
    foundPlaceDetails, setFoundPlaceDetails,
    microchipped, setMicrochipped,
    chipId, setChipId,
    // images
    previews, existingPhotos, totalPhotos,
    fileInput, handleFiles,
    removeExistingPhoto, removeNewImage,
    onDragStart, onDrop, triggerFileInput,
    // ui
    loading, saving, error,
    reportAuthorUid, user,
    // location
    departments, cities,
    // actions
    handleSubmit, navigate,
  } = useEditarReporte()

  // ── Guards ─────────────────────────────────────────────────────
  if (!user) return <UnauthScreen />
  if (loading) return <LoadingScreen />
  if (error && reportAuthorUid && reportAuthorUid !== user.uid)
    return <ErrorScreen message={error} />

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-10 mt-16">
      <div className="max-w-2xl mx-auto px-4">

        {/* Cabecera */}
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-900">Editar Reporte</h1> */}
          <p className="text-sm text-gray-500 mt-1">
            Actualiza la información de tu mascota
          </p>
        </div>

        {/* Banner de error global */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">

          {/* ── Sección 1: Tipo de reporte ── */}
          <section className="px-6 py-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
              Tipo de reporte
            </h2>

            <div>
              <FieldLabel>¿Qué pasó con la mascota?</FieldLabel>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className={selectCls}
              >
                <option value="perdida">🔍 Mascota Perdida</option>
                <option value="encontrada">✅ Mascota Encontrada</option>
              </select>
            </div>

            {estado === 'perdida' && (
              <div>
                <FieldLabel required>Nombre de la mascota</FieldLabel>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Firulais"
                  className={inputCls}
                />
              </div>
            )}
          </section>

          {/* ── Sección 2: Ubicación ── */}
          <section className="px-6 py-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
              Ubicación
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Departamento</FieldLabel>
                <select
                  value={department}
                  onChange={(e) => { setDepartment(e.target.value); setCity('') }}
                  className={selectCls}
                >
                  <option value="">Seleccione...</option>
                  {departments.map((dep) => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>

              <div>
                <FieldLabel>Ciudad</FieldLabel>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!department}
                  className={`${selectCls} disabled:bg-gray-100 disabled:cursor-not-allowed`}
                >
                  <option value="">Seleccione...</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <FieldLabel>Barrio</FieldLabel>
              <input
                type="text"
                value={barrio}
                onChange={(e) => setBarrio(e.target.value.trimStart())}
                placeholder="ej. Villa del Rosario"
                className={inputCls}
              />
            </div>
          </section>

          {/* ── Sección 3: Información ── */}
          <section className="px-6 py-5 space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide">
              Información
            </h2>

            <div>
              <FieldLabel required>Descripción</FieldLabel>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe a tu mascota: color, tamaño, señas particulares..."
                className={`${inputCls} resize-none`}
              />
            </div>

            <div>
              <FieldLabel required>Contacto</FieldLabel>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Teléfono o email"
                className={inputCls}
              />
            </div>

            {/* Campos solo para encontrada */}
            {estado === 'encontrada' && (
              <CamposEncontrada
                foundDate={foundDate}           setFoundDate={setFoundDate}
                foundPlaceDetails={foundPlaceDetails} setFoundPlaceDetails={setFoundPlaceDetails}
                microchipped={microchipped}     setMicrochipped={setMicrochipped}
                chipId={chipId}                 setChipId={setChipId}
              />
            )}
          </section>

          {/* ── Sección 4: Imágenes ── */}
          <section className="px-6 py-5">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">
              Imágenes
            </h2>
            <ImageUploader
              existingPhotos={existingPhotos}
              previews={previews}
              totalPhotos={totalPhotos}
              fileInput={fileInput}
              handleFiles={handleFiles}
              removeExistingPhoto={removeExistingPhoto}
              removeNewImage={removeNewImage}
              onDragStart={onDragStart}
              onDrop={onDrop}
              triggerFileInput={triggerFileInput}
            />
          </section>

          {/* ── Sección 5: Acciones ── */}
          <section className="px-6 py-5">
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#FFD54F] hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/mis-reportes')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 px-4 rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>
          </section>

        </form>
      </div>
    </div>
  )
}

export default EditarReporte