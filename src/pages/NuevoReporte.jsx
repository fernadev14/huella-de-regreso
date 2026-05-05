import { useNuevoReporte }         from '../components/newReport/Usenuevoreporte'
import { CamposEncontradaNuevo }   from '../components/newReport/Camposencontradanuevo'
import { ImageUploadGrid }         from '../components/newReport/Imageuploadgrid'
import Login                       from '../pages/Login'

// ── Shared styles ──────────────────────────────────────────────────────────────
const inputCls  = 'w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition bg-white'
const selectCls = `${inputCls} cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed`

function Label({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest pb-3 border-b border-gray-100">
      {children}
    </h2>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────
const NuevoReporte = () => {
  const {
    user,
    name,              setName,
    department,        setDepartment,
    city,              setCity,
    barrio,            setBarrio,
    estado,            setEstado,
    description,       setDescription,
    contact,           setContact,
    foundDate,         setFoundDate,
    foundPlaceDetails, setFoundPlaceDetails,
    microchipped,      setMicrochipped,
    chipId,            setChipId,
    previews, fileInput,
    handleFiles, removeImage, onDragStart, onDrop, triggerFileInput,
    departments, cities,
    loading, error,
    handleSubmit, navigate,
  } = useNuevoReporte()

  if (!user) return <Login />

  return (
    <div className="min-h-screen bg-gray-50 py-10 mt-20">
      <div className="max-w-2xl mx-auto px-4">

        {/* Page header */}
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-900">Crear nuevo reporte</h1> */}
          <p className="text-sm text-gray-400 mt-1">
            Completa la información para ayudar a encontrar una mascota
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <span className="shrink-0">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100"
        >

          {/* ── Sección 1: Tipo ── */}
          <section className="px-6 py-5 space-y-4">
            <SectionTitle>Tipo de reporte</SectionTitle>

            {/* Toggle perdida / encontrada */}
            <div>
              <Label>¿Qué pasó con la mascota?</Label>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                {['perdida', 'encontrada'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setEstado(opt)}
                    className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
                      estado === opt
                        ? 'bg-[#FFD54F] text-gray-900'
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {opt === 'perdida' ? '🔍 Perdida' : '✅ Encontrada'}
                  </button>
                ))}
              </div>
            </div>

            {/* Nombre (perdida) o Fecha (encontrada) */}
            {estado === 'perdida' ? (
              <div>
                <Label required>Nombre de la mascota</Label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Firulais"
                  className={inputCls}
                />
              </div>
            ) : (
              <div>
                <Label>Fecha en que se encontró</Label>
                <input
                  type="date"
                  value={foundDate}
                  onChange={(e) => setFoundDate(e.target.value)}
                  className={inputCls}
                />
              </div>
            )}
          </section>

          {/* ── Sección 2: Ubicación ── */}
          <section className="px-6 py-5 space-y-4">
            <SectionTitle>Ubicación</SectionTitle>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label required>Departamento</Label>
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
                <Label>Ciudad</Label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!department}
                  className={selectCls}
                >
                  <option value="">Seleccione...</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label>Barrio</Label>
              <input
                type="text"
                value={barrio}
                onChange={(e) => setBarrio(e.target.value)}
                placeholder="ej. El Poblado"
                className={inputCls}
              />
            </div>
          </section>

          {/* ── Sección 3: Información ── */}
          <section className="px-6 py-5 space-y-4">
            <SectionTitle>Información</SectionTitle>

            <div>
              <Label required>Descripción</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe a la mascota: especie, color, tamaño, señas particulares..."
                className={`${inputCls} resize-none`}
              />
            </div>

            <div>
              <Label required>Contacto</Label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Teléfono, email o Facebook"
                className={inputCls}
              />
            </div>

            {/* Campos extra solo para encontrada */}
            {estado === 'encontrada' && (
              <CamposEncontradaNuevo
                foundPlaceDetails={foundPlaceDetails} setFoundPlaceDetails={setFoundPlaceDetails}
                microchipped={microchipped}           setMicrochipped={setMicrochipped}
                chipId={chipId}                       setChipId={setChipId}
              />
            )}
          </section>

          {/* ── Sección 4: Fotos ── */}
          <section className="px-6 py-5 space-y-4">
            <SectionTitle>Fotos <span className="normal-case font-normal text-gray-400">(máx. 4)</span></SectionTitle>
            <ImageUploadGrid
              previews={previews}
              fileInput={fileInput}
              handleFiles={handleFiles}
              removeImage={removeImage}
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
                disabled={loading}
                className="flex-1 bg-[#FFD54F] hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" />
                    Publicando...
                  </>
                ) : (
                  '📢 Publicar reporte'
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
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

export default NuevoReporte