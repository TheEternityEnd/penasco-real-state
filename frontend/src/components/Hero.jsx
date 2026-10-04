import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Bed, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero({ onSearchSubmit, currentFilters }) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const [propertyType, setPropertyType] = useState(currentFilters.type || 'Todos');
  const [bedrooms, setBedrooms] = useState(currentFilters.bedrooms || 'Cualquiera');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit({
      search: searchTerm,
      type: propertyType,
      bedrooms: bedrooms
    });

    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[620px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
        <div className="absolute inset-0 bg-brand-950/30 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-200 text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-brand-300" />
          <span>Inversiones Inmobiliarias Premium en Sonora</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
          Encuentra tu refugio frente al mar en <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-amber-200">Puerto Peñasco</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
          Villas privadas, condominios con vista panorámica y propiedades de alto rendimiento en Sandy Beach, Las Conchas y Choya Bay.
        </p>

        {/* Search Bar Box */}
        <div className="mt-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-lg p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/30 text-slate-800">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="sm:col-span-5 relative text-left">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
                Ubicación o Palabra Clave
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-5 h-5 text-brand-600 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Ej. Sandy Beach, alberca, terraza..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="sm:col-span-3 text-left">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
                Tipo de Propiedad
              </label>
              <div className="relative flex items-center">
                <Home className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition cursor-pointer appearance-none"
                >
                  <option value="Todos">Todos los tipos</option>
                  <option value="Casa / Villa">Casa / Villa</option>
                  <option value="Condominio">Condominio</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
              </div>
            </div>

            {/* Bedrooms Filter */}
            <div className="sm:col-span-2 text-left">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 ml-1">
                Habitaciones
              </label>
              <div className="relative flex items-center">
                <Bed className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full pl-9 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition cursor-pointer appearance-none"
                >
                  <option value="Cualquiera">Todas</option>
                  <option value="2">2+ recs</option>
                  <option value="3">3+ recs</option>
                  <option value="4">4+ recs</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 sm:self-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 active:scale-[0.98] text-white font-semibold text-sm rounded-xl shadow-md shadow-brand-600/30 transition flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </button>
            </div>

          </form>
        </div>

        {/* Confidence highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Asesoría Bilingüe Certificada</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Fideicomisos y Cierre Legal Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>Retorno de Inversión Vacacional</span>
          </div>
        </div>

      </div>
    </div>
  );
}
