/**
 * PetCardSkeleton.jsx
 * Placeholder animado mientras cargan las tarjetas.
 */

const Shimmer = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
)

const PetCardSkeleton = () => (
  <div className='bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100'>
    {/* Imagen */}
    <Shimmer className='h-52 w-full rounded-none' />
    {/* Contenido */}
    <div className='p-4 space-y-3'>
      <Shimmer className='h-4 w-3/4' />
      <Shimmer className='h-3 w-1/2' />
      <Shimmer className='h-3 w-full' />
      <Shimmer className='h-3 w-5/6' />
      <div className='pt-2 border-t border-gray-100'>
        <Shimmer className='h-3 w-1/3' />
      </div>
    </div>
  </div>
)

/**
 * Genera N skeletons en un grid
 */
export const SkeletonGrid = ({ count = 9 }) => (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
    {Array.from({ length: count }).map((_, i) => (
      <PetCardSkeleton key={i} />
    ))}
  </div>
)

export default PetCardSkeleton