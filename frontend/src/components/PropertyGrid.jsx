import React from 'react';
import PropertyCard from './PropertyCard.jsx';
import { SlidersHorizontal, RefreshCw, AlertCircle, Building2 } from 'lucide-react';

export default function PropertyGrid({
  properties,
  loading,
  error,
  onRetry,
  activeType,
  onTypeChange,
  activeZone,
  onZoneChange,
  onResetFilters,
  onSelectProperty,
  hasActiveFilters
}) {
  const propertyTypes = ['Todos', 'Casa / Villa', 'Condominio', 'Penthouse'];
  const zones = ['Todas', 'Sandy Beach', 'Las Conchas', 'Marina', 'Choya Bay'];

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado del Catálogo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Inventario Disponible</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Catálogo de Propiedades Exclusivas
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Explora residencias verificadas y listas para escriturarse en los destinos con mayor plusvalía de Puerto Peñasco.
            </p>
          </div>

          {/* Contador y Limpiar Filtros */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-semibold text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
              {loading ? 'Consultando...' : `${properties.length} propiedades encontradas`}
            </span>
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-xs sm:text-sm font-semibold text-brand-700 hover:text-brand-800 underline underline-offset-4 cursor-pointer"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Barra de Filtros Rápidos (Categorías y Zonas) */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Categorías por tipo */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeType.toLowerCase() === type.toLowerCase()
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Selector de Zonas */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">Zona:</span>
            <select
              value={activeZone}
              onChange={(e) => onZoneChange(e.target.value)}
              className="text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer shadow-2xs"
            >
              {zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone === 'Todas' ? 'Todas las zonas' : zone}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Estado: CARGANDO (Skeletons) */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs animate-pulse">
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2">
                    <div className="h-4 bg-slate-100 rounded" />
                    <div className="h-4 bg-slate-100 rounded" />
                    <div className="h-4 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado: ERROR */}
        {!loading && error && (
          <div className="my-12 p-8 max-w-lg mx-auto bg-rose-50 border border-rose-200 rounded-2xl text-center">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-rose-900">No se pudieron cargar las propiedades</h3>
            <p className="mt-1 text-xs sm:text-sm text-rose-700">{error}</p>
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Intentar nuevamente</span>
            </button>
          </div>
        )}

        {/* Estado: VACÍO (Sin resultados) */}
        {!loading && !error && properties.length === 0 && (
          <div className="my-12 p-12 max-w-md mx-auto bg-white border border-slate-200 rounded-2xl text-center shadow-xs">
            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl mx-auto flex items-center justify-center mb-4">
              <SlidersHorizontal className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No encontramos propiedades coincidentes</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Prueba ajustando los filtros de búsqueda, seleccionando otra zona o limpiando la palabra clave.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-6 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

        {/* Cuadrícula de Propiedades (Grid) */}
        {!loading && !error && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
